// const isServer = typeof window === 'undefined'
const { State } = require('./State.js')
const Vec2 = require('vec2')

const isServer = typeof window === 'undefined'

class Game {
  constructor () {
    this.state = new State()
    this.states = [this.state]
    this.players = {}
    this.sockets = []
  }

  onPlayerJoin (socket) {
    let squidId = 0
    while(this.sockets[squidId] != null) ++squidId
    this.sockets[squidId] = socket
    this.players[socket.id] = squidId
    this.state.addSquid(squidId)
  }

  onChangeLook (socket, angle) {

  }

  onShoot (socket, direction) {

  }

  onDoPulse (socket, direction) {

  }

  onPlayerLeave (socket) {

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
