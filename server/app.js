
'use strict';

/**
 * Preflight-checks
 */

if ( !process.env.NODE_ENV ) {
  process.env.NODE_ENV = 'development';
}

/**
 * Module dependencies.
 */

var path    = require('path');
var restify = require('restify');
var bunyan  = require('bunyan');
var nconf = require(path.join(__dirname, 'helpers', 'config.js')); 
var mongoose = require('mongoose');
var config = require(path.join(__dirname, 'config', 'global.json'));

/**
 * Mongo
 */
mongoose.connect(config.mongo.uri);
/**
 * Logging
 */

var LogglyStream = require( path.join(__dirname, 'helpers', 'logglyStream.js') );
var Logger = bunyan.createLogger({
  name: nconf.get('Logging:Name'),
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  },
  streams: [
    { path: path.join(nconf.get('Logging:Dir'),process.env.NODE_ENV+'-'+nconf.get('Server:Name')+'.log') },
    { type: 'raw', stream: new LogglyStream() }
  ]
});

/**
 * Server
 */

var server = restify.createServer({
  name       : nconf.get('Server:Name'),
  version    : nconf.get('Server:DefaultVersion'),
  acceptable : nconf.get('Server:Acceptable'),
  log        : Logger,
  formatters : {
    'application/json': require(path.join(__dirname, 'helpers/jsonFormatter.js'))
  }
});



/**
 * Server plugins
 */

var throttleOptions = {
  rate: nconf.get('Server:ThrottleRate'),
  burst: nconf.get('Server:ThrottleBurst'),
  ip: false,
  username: true
};

var plugins = [
  restify.acceptParser( server.acceptable ),
  restify.throttle( throttleOptions ),
  restify.dateParser(),
  restify.queryParser(),
  restify.fullResponse(),
];

if ( nconf.get('Security:UseAuth') ) {
  plugins.push( require( path.join(__dirname, 'plugins', 'customAuthorizationParser') )() );
}

if ( nconf.get('Security:UseACL') ) {
  plugins.push( require( path.join(__dirname, 'plugins', 'customACLPlugin') )() );
}

plugins.push( restify.bodyParser() );
plugins.push( restify.gzipResponse() );

server.use( plugins );

/**
 * CORS
 */

var corsOptions = {
  origins: nconf.get('CORS:Origins'),
  credentials: nconf.get('CORS:Credentials'),
  headers: nconf.get('CORS:Headers'),
};

server.pre(restify.CORS(corsOptions));

if (corsOptions.headers.length) {
  var corsHelper = require(path.join(__dirname, 'helpers', 'corsHelper.js'))(corsOptions);
  server.on('MethodNotAllowed', corsHelper);
}

/**
 * Request / Response Logging
 */

server.on('after', restify.auditLogger({
  log: Logger
}));

/**
 * Middleware
 */

var setupMiddleware = function ( middlewareName ) {
  var middleware = require( path.join(__dirname, 'middleware', middlewareName) );
  return middleware.setup( server );
};

[
  'root',
  'secret',
  'users'
]
.map( setupMiddleware );

/**
 * Listen
 */


var listen = function( done ) {
  server.listen( nconf.get('Server:Port'), function() {
    if ( done ) {
      return done();
    }
    console.log();
    console.log( '%s now listening on %s', nconf.get('App:Name'), server.url );
    console.log();
  });
};

if ( !module.parent ) {
  listen();
}

/**
 * Export
 */

module.exports.listen = listen;
