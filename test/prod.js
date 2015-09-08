
var test = require('tape')
process.env.NODE_ENV = 'production'
var config = require('../')

test('NODE_ENV=production', function (t) {
  var conf = config(null, __dirname)

  t.equals(conf.env, 'production', 'config.env is `production`')
  t.equals(conf.a, 9, 'env props get overwritten')
  t.equals(conf.b, 1, 'ok')
  t.equals(conf.foo, 'bar', '"global" props are there')

  t.end()
})
