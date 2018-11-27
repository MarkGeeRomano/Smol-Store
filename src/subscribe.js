const { ipcRenderer, remote } = require('electron')

module.exports = (callback) => {
  if(!callback || !(callback instanceof Function)) {
    throw new Error('Must pass a function into subscribe')
  }
  let smolStore
  try {
    smolStore = remote.getGlobal('smolStore')
  } catch (err) {
    throw new Error('Subscribe can only be called in a renderer process')
  }
    ipcRenderer.send(smolStore.kSubscribe)
    ipcRenderer.on(smolStore.kRefresh, callback)
    window.onunload = () => ipcRenderer.send(smolStore.kUnsubscribe)
}