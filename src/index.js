const constants = require('./constants')
const createDispatch = require('./createDispatch')
const setListeners = require('./setListeners')
const subscribe = require('./subscribe')
const { remote } = require('electron')

module.exports = {
  initialize(state, reducers, opts = {}) {
    if (global.document) {
      throw new Error("initialize must be called in the main process - you are calling it from a renderer process")
    } else if (Array.isArray(state) || typeof state !== 'object') {
      throw new TypeError('state passed into initialize must be type object')
    } else if (Array.isArray(reducers) || typeof reducers !== 'object') {
      throw new TypeError('state passed into initialize is not an object')
    } else if (Object.keys(opts).length) {
      if (opts.kRefresh) {
        if (typeof opts.kRefresh !== string) {
          throw new TypeError(`opts.kRefresh must be type string. Got ${typeof opts.kRefresh}`)
        }
      } else if (opts.kSubscribe) {
        if (typeof opts.kSubscribe !== string) {
          throw new TypeError(`opts.kSubscribe must be type string. Got ${typeof opts.kRefresh}`)
        }
      } else if (opts.kUnsubscribe) {
        if (typeof opts.kUnsubscribe !== string) {
          throw new TypeError(`opts.kUnsubscribe must be type string. Got ${typeof opts.kRefresh}`)
        }
      }
    } else {
      const stateKeys = Object.keys(state)
      const reducerKeys = Object.keys(reducers)
      if (stateKeys.length !== reducerKeys.length) {
        throw new Error("reducer key's and state key's lengths don't match")
      } else if (!(stateKeys.every(key => reducerKeys.includes(key) && reducerKeys.every(key => stateKeys.includes(key))))) {
        throw new Error("state's and reducer's properties don't match")
      }
    }
    global.smolStore = {
      state,
      kRefresh: opts.kRefresh || constants.kRefresh,
      kSubscribe: opts.kSubscribe || constants.kSubscribe,
      kUnsubscribe: opts.kUnsubscribe || constants.kUnsubscribe,
      subscribers: {}
    }

    this.dispatch = createDispatch(state, reducers)
    setListeners()
  },

  get state() {
    try { global.smolStore.state }
    catch (e) {
      try { remote.getGlobal('smolStore').state }
      catch (e) { throw new Error('Must call initialize to create a state') }
    }

    try { return global.smolStore.state }
    catch (e) { return remote.getGlobal('smolStore').state }
  },

  dispatch() {
    if (global.document) {
      throw new Error("smolStore.dispatch must be called in the main process - you are calling it from a renderer process")
    } else {
      throw new Error("initialize has not been called - can't dispatch")
    }
  },

  subscribe
}