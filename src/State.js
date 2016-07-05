'use strict'
const clone = require('clone')
const CONST = require('./Constants.js')
const { Squid } = require('./Squid.js')

class State {
  constructor (powerups = [], squids = [], inputs = []) {
    this.squids = squids
    this.powerups = powerups
    this.inputs = inputs
  }

  update (dt = CONST.UPDATE_TIME) {
    const newState = new State(clone(this.powerups), clone(this.squids), clone(this.inputs))
    newState.squids.forEach((squid) => squid.update(dt))
    return newState
  }

  addSquid (squidId) {
    const squid = new Squid(squidId)
    this.squids[squidId] = squid
    this.inputs[squidId] = null
  }

  setCommand (squidId, command) {
    this.inputs[squidId] = command
  }
}
exports.State = State
