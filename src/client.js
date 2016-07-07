// 'use strict'
const io = require('socket.io-client')
const { Game } = require('./Game.js')
const gameLogic = new Game()
var game = new Phaser.Game(800, 600, Phaser.AUTO)
var BubbleFilter;

const socket = io()

var GameState = {
  preload: function () {
    this.load.image('squid', '../assets/squid.png')
  },

  create: function () {
  },

  update: function () {
    // read inputs
    let mouseX = game.input.mousePointer.x
    let mouseY = game.input.mousePointer.y
    gameLogic.update()
  }
}

game.state.add('GameState', GameState)
game.state.start('GameState')
