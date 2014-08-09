'use strict'

var path = require('path');

var conf = require('nconf').file({
  file: path.join(__dirname, 'config', 'global.json')
});

module.exports = conf;
