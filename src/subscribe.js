const { ipcRenderer, remote } = require('electron')

module.exports = (callback) => {
  if (!global.document) {
    throw new Error('Must pass a function into subscribe')
  } else if (!callback || !(callback instanceof Function)) {
    throw new Error('Subscribe can only be called in a renderer process')
  }

  let smolStore
  try { smolStore = remote.getGlobal('smolStore') }
  catch (err) {
    throw new Error("initialize has not been called - can't subscribe")
  }

  ipcRenderer.send(smolStore.kSubscribe)
  ipcRenderer.on(smolStore.kRefresh, callback)
  window.onunload = () => ipcRenderer.send(smolStore.kUnsubscribe)
}