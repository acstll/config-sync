
var test = require('tape')
var config = require('../')

test('require.main', function (t) {
  var re = /node_modules\/tape\/bin/

  t.ok(re.test(require.main.filename))

  t.throws(function () {
    // no config.json file found
    config()
  })

  t.end()
})

test('Pass in dirname string', function (t) {
  var conf = config(__dirname)

  t.equals(conf.__env, 'development', 'config.env is `development`')
  t.equals(conf.a, 3000, 'env props get overridden')
  t.equals(conf.b, 'hello', 'overriding with argv works')
  t.equals(conf.b, conf.development.b, '')
  t.equals(conf.devOnly, true, '"dev"-only props are there')
  t.equals(conf.foo, 'bar', '"global" props are there')

  t.end()
})

test('Pass in object', function (t) {
  var conf = config({ devOnly: false })

  t.equals(conf.devOnly, false, 'works')
  t.equals(conf.__env, 'development', '`env` prop is there')
  t.notOk(conf.a, 'the rest is missing')

  t.end()
})
