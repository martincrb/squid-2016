'use strict'
// const clone = require('clone')
const CONST = require('./Constants.js')
const { Squid } = require('./Squid.js')

class State {
  constructor (powerups = [], squids = [], inputs = []) {
    this.squids = squids
    this.powerups = powerups
    this.inputs = inputs
  }

  update () {
    squids.forEach((squid) => squid.update())
  }

  addSquid (squidId) {
    const squid = new Squid(squidId)
    this.squids[squidId] = squid
    this.inputs[squidId] = null
  }
}
exports.State = State
