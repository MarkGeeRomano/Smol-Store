// * unit tests

//initialize
  //state param
    //pass in array
    //pass in string
    //pass in null
  //reducers param
    //pass in array
    //pass in string
    //pass in null
  //opts param
    //pass in array
    //pass in string
    //pass in null
    //pass in bad keys
    //pass in good keys
  //pass in state with diff props from reducers
  //pass in reducers with diff props from states
  //pass in uneven amt of props for each
  //setListeners should set two listeners with one callback each

//dispatch
  //check for error before calling init
  //check for error after calling init

//state getter
  //should throw in main before init
  //should throw in renderer before init
  //should work in main after init
  //should work in renderer after init
  //should match state passed into initialize

//subscribe
  //call before init
  //pass in bad arg
    //obj
    //arr
    //string
    //null
  //check for listener
  //check for onunload

// * integration tests

//dispatch/state/reducers
  //dispatching event should change single property of state
  //dispatching event should change multiple properties of state
  //dispatching event should change no property of state

//subscribe
  //check if id added to subscribers
  //check if value to key is given window
  //check if callback called when state changes
  //check if id removed when browserwindow closed

const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')