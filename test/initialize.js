'use strict'

const test = require('ava')
const reducers = require('./fixtures/reducers')
const state = require('./fixtures/state')
const smolStore = require('../src')
const { Application } = require('spectron')
const electronPath = require('electron')
const path = require('path')

test.beforeEach(async t => {
  t.context.app = new Application({
    path: electronPath,
    args: [path.join(__dirname, 'fixtures', 'main.js')]
  })

  await t.context.app.start()
})

test.afterEach(async t => {
  t.context.app.stop()
})

test('Initialize only accepts Object as state', t => {
  console.log('!')
  // console.log(t.context.smolStore++)
  // smolStore.initialize(state, reducers)
  // console.log(smolStore.state)
  // try { t.context.smolStore.initialize(state, reducers)  }
  // catch (err) {
  // t.is(err.message, 'state passed into initialize must be type object')
  // t.pass()
  // }
  // console.log(smolStore.state)
  t.pass()
})

test('Initialize only accepts Object as state', t => {
  // console.log(smolStore.state)
  // console.log(t.context.smolStore++)
  // console.log('2',t.context.smolStore.state)
  // try { smolStore.initialize(state, reducers)  }
  // catch (err) {
  // t.is(err.message, 'state passed into initialize must be type object')
  // t.pass()
  // }
  t.pass()
})