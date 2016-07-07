const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { Game } = require('./Game.js')

const game = new Game()

app.use(express.static('dist'))
app.get('/', function (req, res) {
  res.sendfile('../dist/index.html')
})

app.get('/test', function (req, res) {
  res.send('testerino')
})

io.on('connection', function (socket) {
  console.log(`${socket.id} connected`)
  game.onPlayerJoin(socket)

  socket.on('changeLook', function (angle) {
    game.onChangeLook(socket, angle)
  })

  socket.on('doPulse', function (direction) {
    game.onDoPulse(socket, direction)
  })

  socket.on('shoot', function (direction) {
    console.log(`${socket.id} shot`, direction)
    game.onShoot(socket, direction)
  })

  socket.on('disconnect', function () {
    console.log(`${socket.id} left`)
    game.onPlayerLeave(socket)
  })

  socket.on('game:ping', () => socket.emit('game:pong', Date.now()))
})

const PORT = process.env.PORT || 3000
http.listen(PORT, function () {
  console.log(`listening on *:${PORT}`)
})
