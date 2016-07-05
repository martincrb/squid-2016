// 'use strict'
const Phaser = require('./phaser.js')
const { Game } = require('./Game.js')
window.PIXI = require('./phaser/build/custom/pixi.js')
window.p2 = require('./phaser/build/custom/p2.js')
window.Phaser = require('./phaser/build/custom/phaser-split.js')

const gameLogic = new Game()
var GameState = {
  preload: function () {
    this.load.image('squid', '../assets/squid.png')
  },
  create: function () {
    this.squid = this.game.add.sprite(0, 0, 'squid')
  },
  update: function () {
    gameLogic.update()

    // render
    let x = gameLogic.state.squids[0].position[0]
    let y = gameLogic.state.squids[0].position[1]
    this.squid.x = x
    this.squid.y = y
  }
}
var game = new Phaser.Game(800, 600, Phaser.AUTO)

game.state.add('GameState', GameState)
game.state.start('GameState')
