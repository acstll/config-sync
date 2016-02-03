
var path = require('path')
var merge = require('lodash.merge')
var extend = require('xtend')
var argv = require('minimist')(process.argv.slice(2))

function configSync (dir) {
  var file = {}
  var env = process.env.NODE_ENV || 'development'
  var dirname, sum, config

  if (!dir) {
    dirname = (require.main ? path.dirname(require.main.filename) : false)
  } else if (typeof dir === 'string') {
    dirname = dir
  } else {
    file = dir
  }

  if (dirname) {
    // Throws if nothing found
    file = require(path.join(dirname, 'config'))
  }

  // Merge options from command-line
  sum = merge(file, argv)

  // Override root keys with "environment" ones (if any)
  // And add `__env` and `__dirname` keys for reference
  config = extend(sum, (sum[env] || null), { __dirname: dirname, __env: env })

  return config
}

module.exports = configSync
