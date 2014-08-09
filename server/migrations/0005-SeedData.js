'use strict';

var mongodb = require('mongodb');

exports.up = function(db, next){
	mongodb.Collection(db, 'User').insert({
      email: 'nkcraddock@gmail.com'
  	}, next);
};

exports.down = function(db, next){
	mongodb.Collection(db, 'User').remove({ email: 'nkcraddock@gmail.com' }, next);
};
