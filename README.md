# Smol-Store <img src="./github/totoro.gif" width="30">

A smol redux-inspired store for your electron app.

## Installation
```
npm install smol-store
```

## Philosophy
Sure, there are other libraries out there that achieve the same, but this lib is  _very smol_, it's dumb simple (~75 lines of code), and the API consists of only 4 functions.

This was implemented from scratch in an [@araBlocks][araBlocks] electron application. It's been a real asset, so it's been pulled out and packed into an npm module.

## Usage
```js
//reducers.js
module.exports = {
 aNumber: (state, load) => {
  switch (load.type) {
    case 'ADD_1':
      state += 1
      break
    case 'ADD_2':
      state += 2
      break
    default:
      state += load.value
    }
    return state
  }
}
```
```js
//state.js
module.exports = { aNumber: 0 } //property names must match reducer names
```
```js
//main.js (root of electron app)
const smolStore = require('smol-store')
const state = require('./state')
const reducers = require('./reducers')

smolStore.initialize(state, reducers))//initialize needs to be called before API can be used

//set regular listeners for main process - call `dispatch` when heard
ipcMain.on('increment_1', () => smolStore.dispatch({ type: 'ADD_1' }))
ipcMain.on('increment_2', () => smolStore.dispatch({ type: 'ADD_2' }))
ipcMain.on('increment_custom', (event, value) => smolStore.dispatch({ type: 'CUSTOM', load: { value } }))
```
```js
//index.js (script for index.html)
const { ipcRenderer } = require('electron')
const { subscribe, state } = require('smol-store')

document.getElementById('button1').onclick = () => ipcRenderer.send('increment_1')
document.getElementById('button2').onclick = () => ipcRenderer.send('increment_2')
document.getElementById('button3').onclick = () => ipcRenderer.send('increment_custom', Math.random())

const display = document.getElementById('display')

display.innerText = state.aNumber//`state` is the object created in state.js, made global through `initialize`

//the callback passed into `subscribe` will be called when the `state` has been changed.
subscribe(() => display.innerText = state.aNumber)
```

## API

### `someReducerName(state, load)`
A function that corresponds to a property on the state that holds instructions for modifying that piece of the state, based on the `type` value the `load` holds. _Must be called in main process_ 
- `state` - The property of the state that corresponds to the reducer
- `load` - An optional value passed into the reducer


### `initialize(state, reducers, [opts])`
Sets the initial app state and creates the dispatch function you'll use to update your state.
- `state` - An object representing the initial state of the app.
- `reducers` - An object with properties whose values are **functions**, whose property names are the **same** as the `state` property it corresponds to. The function will work to modify that part of the `state`.
- `opts` - An object you can add properties to that will change the value of the string `dispatch` emits to renderer processes, the value of the string your renderer process emits to the main renderer to subscribe to changes, and the value the renderer process emits to unsubscribe to changes. I'd leave the defaults unless your having naming clashes 😁. The properties you can add to opts:
  - `kRefresh` (default: `'REFRESH'`) - Triggers callback passed into `subscribe`
  - `kSubscribe` (default: `'SUBSCRIBE'`) - Subscribes a renderer process to state changes
  - `kUnsubscribe` (default: `'UNSUBSCRIBE'`) - Removes subscription from renderer process


### `state`
A [`getter`][getter] function that returns the `state`. Stored in the main process' `global` variable.

### `dispatch(load)`
Dispatches an object to all reducers to modify the state accordinly. Will emit a `'REFRESH'` message to all subscribed renderer processes after updating state. _Must be called in main process_ 

- `load` an object with atleast one property called `type`. Other properties that hold arbitrary values can be added

[getter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get