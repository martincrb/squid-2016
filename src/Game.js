// const isServer = typeof window === 'undefined'
const { State } = require('./State.js')
const Vec2 = require('vec2')
class Game {
  constructor () {
    this.state = new State()
    this.state.addSquid(0)
    this.state.squids[0].setDirection(new Vec2(-10, -10))
    this.states = [this.state]
    this.players = {}
    this.sockets = []
  }

  update () {
    let nextState
    nextState = new State()
    nextState = this.state.update()
    this.states.push(nextState)
    this.state = nextState
  }
}
exports.Game = Game
