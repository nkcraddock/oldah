'use strict';

/**
 * Module dependencies.
 */

var crypto = require('crypto'),
    path = require('path'),
    _ = require('lodash'),
    restify = require('restify'),
    request = require('request'),
    q = require('q');

var nconf = require('nconf').file({
    file: path.join(__dirname, '..', 'config', 'global.json')
});


/**
 * Returns auth header pieces
 */

var parseAuthHeader = function(authorizationHeader) {
  var deferred = q.defer();
  var verifyPath = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + authorizationHeader;
    
  request.get(verifyPath, function(error, response, body) {
    if(error) {
      console.log('Error verifying token: ' + error);
      deferred.reject(error);
    } else {
      var claims = JSON.parse(body);
      console.log(claims.email);
      deferred.resolve({
        raw: authorizationHeader,
        scheme: 'oauth2',
        claims: claims,
        user: claims.email
      });
    }
  });

  return deferred.promise;
};

/**
 * Returns a request signature
 */

var getSignature = function(key, secret, stringToSign) {

    var signatureString = new Buffer(crypto.createHmac('sha1', secret).update(stringToSign).digest('hex')).toString('base64');

    return signatureString;

};

/**
 * Returns a plugin that will parse the client's Authorization header.
 *
 * Subsequent handlers will see `req.authorization`, which looks like:
 *
 * {
 *   scheme: <Basic|Signature|...>,
 *   credentials: <Undecoded value of header>,
 *   basic: {
 *     username: $user
 *     password: $password
 *   }
 * }
 *
 * `req.user` will also be set, and defaults to `{ name: 'anonymous' }`.
 *
 * @return {Function} restify handler.
 * @throws {TypeError} on bad input
 */



module.exports = function() {

    var parseAuthorization = function(req, res, next) {
        var credentialList = nconf.get('Security:Users');
        var allowAnon = nconf.get('Security:AllowAnonymous');
        var authorizationHeader;
        var user;

        // Skip if anonymous are allowed ...
        if (allowAnon && !req.headers.authorization) {
            req.user = {
                name: 'anonymous'
            };
            return next();
        }

        // Validate Headers
        if (!req.headers.authorization) {
            return next(new restify.InvalidHeaderError('Authorization header required.'));
        }

        // Parse auth header
        parseAuthHeader(req.headers.authorization)
        .then(function(authorizationHeader) {
          // Fill authorization object
          req.authorization = {
              scheme: authorizationHeader.scheme,
              credentials: authorizationHeader.raw,
              user: authorizationHeader.user
          };

          // Validate authorization object
          if (req.authorization.scheme.toLowerCase() !== nconf.get('Security:Scheme').toLowerCase()) {
              return next(new restify.InvalidHeaderError('Authorization scheme is invalid.'));
          }

          // grab credentials
          user = _.where(credentialList, {
              key: req.authorization.user
          }).pop();

          // check user
          if (!user) {
              return next(new restify.NotAuthorizedError('Authorization key unknown.'));
          }

          // Set user information
          req.user = user;

          return next();
        })
        .fail(function(err) {
          console.log(err);
            return next(new restify.InvalidHeaderError('Authorization header is invalid.'));
        });

    };

    return parseAuthorization;
};
