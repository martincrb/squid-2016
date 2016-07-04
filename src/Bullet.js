'use strict'
const CONST = require('./Constants.js')

class Bullet {
  constructor (dir, initial_pos, squidId) {
    this.direction = dir
    this.position = initial_pos
    this.speed = CONST.BULLET_SPEED
    this.shooterId = squidId
    this.alive = true
  }
  /*
  * each tick bullet updates using current pos, speed and direction
  */
  update (dt = CONST.UPDATE_TIME) {
    this.position = this.position.add(this.direction.multiply(this.speed * dt))
  }
}
exports.Bullet = Bullet
