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
    console.log("onPlayerJoin", socket.id)
    let squidId = 0
    while(this.sockets[squidId] != null) ++squidId
    this.sockets[squidId] = socket
    this.players[socket.id] = squidId
    this.state.addSquid(squidId)
    if (isServer) this.sendState()
  }

  onChangeLook (socket, angle) {

  }

  onShoot (socket, direction) {

  }

  onDoPulse (socket, direction) {
    let squidId = this.players[socket.id]
    let dir = Vec2(direction.x - this.state.squids[squidId].position.x,
      direction.y - this.state.squids[squidId].position.y)
    this.state.squids[squidId].setDirection(dir)
    if (isServer) this.sendState()
  }

  onPlayerLeave (socket) {
    console.log("onPlayerLeave", socket.id)
    let squidId = this.players[socket.id]
    this.sockets[squidId] = null
    delete this.players[socket.id]
    if (isServer) this.sendState()
  }

  sendState () {
    const turnIndex = this.states.length - 1
    const gamestate = {
      state: this.state,
      players: this.players,
      timestamp: Date.now()
    }
    
    this.sockets.forEach((socket) => {
      if (socket) socket.emit('game:state', gamestate, turnIndex)
    })
  }

  update () {
    let nextState
    nextState = new State()
    nextState = this.state.update()
    this.states.push(nextState)
    this.state = nextState
    this.sendState()
  }
}
exports.Game = Game
