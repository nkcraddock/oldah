
'use strict';

var User = require('../../models/User');

/**
 * Routes
 */

var routes = [];

routes.push({
  meta: {
    name: 'getUsers',
    method: 'GET',
    paths: [
      '/users'
    ],
    version: '1.0.0',
  },
  middleware: function( req, res, next ) {
    User.find({}, function(err, users) {
      res.send(users);
    });
  }
});

routes.push({
  meta: {
    name: 'createUser',
    method: 'POST',
    paths: [
      '/users'
    ],
    version: '1.0.0',
  },
  middleware: function(req, res, next) {
    User.create({
      email: req.body.email
    }, function(err, user) {
      if(err) {
        return next(err);
      }

      res.send(201, user);
    });
  }
});

routes.push({
  meta: {
    name: 'deleteUser',
    method: 'DEL',
    paths: [
      '/users/:id'
    ],
    version: '1.0.0',
  },
  middleware: function(req, res, next) {
    User.remove({ _id: req.params.id }, function(err) {
      res.send(200);
    });
  }
});
exports.setup = function ( server ) {
  routes.forEach(function( route ) {
    route.meta.paths.forEach(function( aPath ) {
      route.meta.method = route.meta.method.toLowerCase();
      server[route.meta.method]({
        name: route.meta.name,
        path: aPath,
        version: route.meta.version
      }, route.middleware );
    });
  });
};
