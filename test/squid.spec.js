const test = require('tape')
const Vec2 = require('vec2')
const { Squid } = require('../src/Squid.js')

test('Squid :: Basics', (t) => {
  const squidId = 0
  const squid = new Squid(squidId)
  t.equal(squidId, squid.id,
    'Squid should have the id passed to the constructor')
  const direction = new Vec2(10, 5).normalize()

  squid.setDirection(direction)
  t.deepEqual(squid.direction, direction,
    'Squid should have direction applied')
  squid.update(1)
  t.deepEqual(squid.position, Vec2(10, 5).normalize(),
    'Update should move squid in the direction selected')
  t.end()
})

test('Squid :: Shoot & Bullets', (t) => {
  const squidId = 0
  const squid = new Squid(squidId)
  const direction = new Vec2(0, 0).normalize()
  const position = new Vec2(0, 0)
  squid.position = position
  squid.setDirection(direction)

  const bullet_direction = new Vec2(1, 1).normalize()
  squid.shoot(bullet_direction)
  t.equal(squid.bullets.length, 1,
    'Shoot should add a bullet to the bullets array')
  t.deepEqual(squid.bullets[0].shooterId, squid.id,
    'Bullet should know who shot')
  t.deepEqual(squid.bullets[0].position, squid.position,
    'Bullet should have the squid position')
  t.deepEqual(squid.bullets[0].direction, bullet_direction,
    'Bullet should have the new direction')
  squid.update(1)
  t.deepEqual(squid.bullets[0].position, bullet_direction,
    'Squid update should move his bullet')
  t.end()
})
