
var path = require('path')
var merge = require('lodash.merge')
var extend = require('xtend')
var argv = require('minimist')(process.argv.slice(2))

function configSync (options, dir) {
  var config = {}
  var dirname = dir || (require.main ? path.dirname(require.main.filename) : false)
  var file = {}
  var sum

  config.env = process.env.NODE_ENV || 'development'

  if (dirname) {
    try {
      var filepath = path.join(dirname, 'config.json')
      file = require(filepath)
    } catch (err) {
      console.log('config-sync: Unable to locate config file at ' + filepath)
    }
  }

  options = (options && typeof options === 'object') ? options : file
  sum = merge(options, argv)

  return extend(config, sum, (sum[config.env] || null), { __dirname: dirname })
}

module.exports = configSync
