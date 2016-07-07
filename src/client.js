// 'use strict'
const io = require('socket.io-client')
const Vec2 = require('vec2')
const { Game } = require('./Game.js')
const { State } = require('./State.js')
const { Squid } = require('./Squid.js')
const CONST = require('./Constants.js')
const Behaviour = require('./Behaviours.js')
const gameLogic = new Game()

var game = new Phaser.Game(800, 600, Phaser.AUTO)

const socket = io()
const sprites = []
var GameState = {
  preload: function () {
    this.load.image('squid', 'assets/squid.png')
  },

  create: function () {
  },

  update: function () {
    // read inputs
    const squidId = gameLogic.players[`/#${socket.id}`]
    if (game.input.activePointer.isDown && !squidIsMoving(squidId))
    {
      let mouseX = game.input.mousePointer.x
      let mouseY = game.input.mousePointer.y
      console.log('squidstate', gameLogic.state.squids[squidId].behaviour)
      // gameLogic.onDoPulse({ id: `/#${socket.id}` }, Vec2(mouseX, mouseY))
      console.log('squidstate', gameLogic.state.squids[squidId].behaviour)
      socket.emit('doPulse', Vec2(mouseX, mouseY))
    }
    // Update game logic
    gameLogic.update()

    // Render game
    for (let i = 0; i < gameLogic.state.squids.length; ++i) {
      if (gameLogic.state.squids[i] != null) {
        const pos = gameLogic.state.squids[i].position
        if (sprites[i] == null) {
          sprites[i] = game.add.sprite(pos.x, pos.y, 'squid')
          sprites[i].scale.setTo(CONST.SQUID_SIZE, CONST.SQUID_SIZE);
        } else {
          sprites[i].x = pos.x
          sprites[i].y = pos.y
        }
      }
    }
  }
}

function squidIsMoving (squidId) {
  const squid = gameLogic.state.squids[squidId]
  return squid.behaviour === Behaviour.MOVE
}
game.state.add('GameState', GameState)
game.state.start('GameState')

socket.on('game:state', (gamestate, turnIndex) => {
  console.log('state received')
  // ignore game states unless they are for turn 0
  const st = new State(gamestate.state.powerups, [], gamestate.state.inputs)
  const newSquids = []
  for (let i = 0; i < gamestate.state.squids.length; ++i) {
    const jsonSquid = gamestate.state.squids[i]
    newSquids[i] = new Squid(jsonSquid.squidId,
    Vec2(jsonSquid.direction.x,jsonSquid.direction.y),
    Vec2(jsonSquid.position.x, jsonSquid.position.y))
    newSquids[i].behaviour = jsonSquid.behaviour
  }
  st.squids = newSquids
  gameLogic.state = st
  gameLogic.players = gamestate.players
  // gameLogic.sockets = gamestate.sockets
})

socket.on('doPulse', (socketId, dir) => {
  // don't apply your own input changes, may cause render flicker when
  // multiple input changes were sent in the same turn
  console.log('client doPulse', socketId)
  if (socketId === `/#${socket.id}`) return
  gameLogic.onDoPulse({ id: socketId }, dir)
})
