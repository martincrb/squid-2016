'use strict'
const CONST = require('./Constants.js')

class Bullet {
  constructor (dir, squidId) {
    this.dir = {x: 0, y:0}
    this.position = {x:0, y:0}
    this.speed = CONST.BULLET_SPEED
    this.shooterId = squidId
    this.alive = true
  }
  /*
  * each tick bullet updates using current pos, speed and direction
  */
  update () {
    this.position = this.position + this.direction * this.speed * CONST.UPDATE_TIME
  }
}
exports.Bullet = Bullet
