'use strict'
const CONST = require('./Constants.js')
const { Bullet } = require('./Bullet.js')
const Vec2 = require('vec2')

class Squid {
  constructor (squidId) {
    this.dir = Vec2(0, 0).normalize()
    this.position = Vec2(0, 0)
    this.speed = CONST.SQUID_SPEED
    this.id = squidId
    this.command = null
    this.bullets = []
  }

  /*
  * this.direction is an object {x: 0, y:0}
  */
  setDirection (dir) {
    this.direction = dir.normalize()
  }

  shoot (dir) {
    // Spawn bullet following the dir dir
    // Sth like new Bullet(dir, shooterId)
    // shooterId indicates which squid shoot the bullet
    const bullet = new Bullet(dir, this.position, this.id)
    var freeIdx = 0
    while(this.bullets[freeIdx] != null) ++freeIdx
    this.bullets[freeIdx] = bullet
  }
  /*
  * each tick squid updates using current pos, speed and direction
  */
  update (dt = CONST.UPDATE_TIME) {
    this.position = this.position.add(this.direction.multiply(this.speed * dt))
    this.bullets.forEach((bullet) => bullet.update())
  }
}
exports.Squid = Squid
