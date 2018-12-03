const { app, BrowserWindow, ipcMain } = require('electron')
const smolStore = require('../../src')
const path = require('path')

smolStore.initialize(require('./state'), require('./reducers'))

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    show: false,
  })

  win.loadURL(`file://${path.resolve(__dirname, '..', 'example', 'browser', 'home')}.html`)
  win.once('ready-to-show', win.show)
})