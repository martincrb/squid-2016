const test = require('tape')
const Vec2 = require('vec2')
const { State } = require('../src/State.js')

test('State :: Basics', (t) => {
  const state = new State()
  state.addSquid(0)
  t.equal(state.squids.length, 1,
    'Should have one squid')
  const state2 = state.update(0)
  t.notOk(state == state2,
    'Should be different state ref')
  t.equal(state2.squids.length, 1,
    'Should still have one squid')
  t.deepEqual(state.squids[0].position, state2.squids[0].position,
    'Squid should be on the same place (dt was 0)')

  t.end()
})
