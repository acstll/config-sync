var path = require('path');
var merge = require('deepmerge');
var extend = require('xtend');
var args = require('yargs').argv;

var dirname = require.main ? path.dirname(require.main.filename) : false;
var config = {};

config.env = process.env.NODE_ENV || 'development';

if (dirname) {
  try {
    var file = require(path.join(dirname, 'config.json'));
  } catch (err) {
    file = {};
  }
}



module.exports = function configSync (options) {
  options = (typeof options === 'object') ? options : file;
  var sum = merge(options, args);
  
  return extend(config, sum, (sum[config.env] || null));
}
