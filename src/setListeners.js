const { ipcMain } = require('electron')

module.exports = () => {
  const { smolStore } = global
  ipcMain.on(smolStore.kSubscribe, ({ sender }) => smolStore.subscribers[sender.id] = sender)
  ipcMain.on(smolStore.kUnsubscribe, ({ sender}) => delete smolStore.subscribers[sender.id])
}