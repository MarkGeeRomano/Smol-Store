const { app, BrowserWindow, ipcMain } = require('electron')
const smolStore = require('../src')
const path = require('path')

require('electron-reload')(path.resolve(__dirname, 'browser'))

smolStore.initialize(require('./state'), require('./reducers'))
app.on('ready', () => {
  const { screen } = require('electron')
  const { size } = screen.getPrimaryDisplay()

  const win = new BrowserWindow({
    width: 400,
    height: 300,
    show: false,
    x: size.width / 2 - 400,
    y: size.height / 2 - 300
  })
  
  win.loadURL(`file://${path.resolve(__dirname, 'browser', 'home')}.html`)
  win.once('ready-to-show', win.show)

  const win2 = new BrowserWindow({
    width: 400,
    height: 300,
    show: false,
    name: 'hehe',
    x: size.width / 2 + 10,
    y: size.height / 2 - 300
  })

  win2.loadURL(`file://${path.resolve(__dirname, 'browser', 'home')}.html`)
  win2.once('ready-to-show', win2.show)
})

ipcMain.on('ADD_1', () => smolStore.dispatch({ type: 'ADD_1' }))
ipcMain.on('ADD_2', () => smolStore.dispatch({ type: 'ADD_2' }))
ipcMain.on('ADD_3', () => smolStore.dispatch({ type: 'ADD_3' }))