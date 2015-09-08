
var test = require('tape')
var config = require('../')

test('require.main', function (t) {
  var conf = config()
  var re = /node_modules\/tape\/bin/

  t.ok(re.test(conf.__dirname), 'should work')

  t.end()
})

test('Default (development)', function (t) {
  var conf = config(null, __dirname)

  t.equals(conf.env, 'development', 'config.env is `development`')
  t.equals(conf.a, 3000, 'env props get overwritten')
  t.equals(conf.b, 'hello', 'overwritting from the terminal works')
  t.equals(conf.b, conf.development.b, '')
  t.equals(conf.devOnly, true, '"dev"-only props are there')
  t.equals(conf.foo, 'bar', '"global" props are there')

  t.end()
})

test('Overwrite config.json', function (t) {
  var conf = config({ devOnly: false }, __dirname)

  t.equals(conf.devOnly, false, 'works')
  t.equals(conf.env, 'development', '`env` prop is there')
  t.notOk(conf.a, 'the rest is missing')

  t.end()
})
