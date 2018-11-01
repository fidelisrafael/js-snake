(() => {
  'use strict'

  console.log('Game is available through window.Game.')

  // export game as global object
  window.Game = require('./index.js')
})()