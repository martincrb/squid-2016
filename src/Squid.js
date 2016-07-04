'use strict'
const CONST = require('./Constants.js')
const Bullet = require('./Bullet.js')
class Squid {
  constructor (squidId) {
    this.dir = {x: 0, y:0}
    this.position = {x:0, y:0}
    this.speed = CONST.SQUID_SPEED
    this.id = squidId
    this.command = null
    this.bullets = []
  }

  /*
  * this.direction is an object {x: 0, y:0}
  */
  setDirection (dir) {
    this.direction = dir
  }

  shoot (dir) {
    // Spawn bullet following the dir dir
    // Sth like new Bullet(dir, shooterId)
    // shooterId indicates which squid shoot the bullet
  }
  /*
  * each tick squid updates using current pos, speed and direction
  */
  update () {
    this.position = this.position + this.direction * this.speed * CONST.UPDATE_TIME
    this.bullets.forEach((bullet) => bullet.update())
  }
}
exports.Squid = Squid
