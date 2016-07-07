'use strict'
const CONST = require('./Constants.js')
const Behaviour = require('./Behaviours.js')
const { Bullet } = require('./Bullet.js')
const Vec2 = require('vec2')

class Squid {
  constructor (squidId, direction = Vec2(0, 0), position = Vec2(0, 0)) {
    this.direction = direction.normalize()
    this.position = position
    this.speed = CONST.SQUID_SPEED
    this.id = squidId
    this.command = null
    this.bullets = []
    this.behaviour = Behaviour.IDLE
  }

  setDirection (dir) {
    if (this.behaviour === Behaviour.IDLE) {
      this.direction = dir.normalize()
      this.behaviour = Behaviour.MOVE
    }
  }

  shoot (dir) {
    // Spawn bullet following the dir dir
    // Sth like new Bullet(dir, position, shooterId)
    // shooterId indicates which squid shoot the bullet
    const bullet = new Bullet(dir, this.position, this.id)
    var freeIdx = 0
    while (this.bullets[freeIdx] != null) ++freeIdx
    this.bullets[freeIdx] = bullet
  }
  /*
  * each tick squid updates using current pos, speed and direction
  */
  update (dt = CONST.UPDATE_TIME) {
    if (this.behaviour === Behaviour.MOVE) {
      this.position = this.position.add(this.direction.multiply(this.speed * dt))
      this.speed -= CONST.SQUID_SPEED_DECAY
      if (this.speed <= CONST.SPEED_LIMIT) {
        console.log('Stopped!')
        this.behaviour = Behaviour.IDLE
        this.speed = CONST.SQUID_SPEED
      }
    }
    this.bullets.forEach((bullet) => bullet.update(dt))
  }
}
exports.Squid = Squid
