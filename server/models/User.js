'use strict';

var mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose');

var Schema = mongoose.Schema;

var userSchema = Schema({
  email: String
});

module.exports = mongoose.model('User', userSchema);
