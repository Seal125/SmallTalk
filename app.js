require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const authenticate = require('./middleware/authenticate')
const rsvpRouter = require('./routes/rsvp')
const eventRouter = require('./routes/event')
const categoryRouter = require('./routes/category')

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(userRouter)
app.use(authenticate)
app.use(rsvpRouter)
app.use(categoryRouter)
app.use(eventRouter)

const users = {};

io.on('connection', socket => {
    console.log('socket connected',socket.id)
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
      console.log('user calling', data)
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
      console.log('accepting call', data)
        io.to(data.to).emit('callAccepted', data.signal);
    })
});


// io.on('connection', (socket) => {
  
  
//   socket.to('video-room', (room) => {
//     console.log('video-room', room)
//     socket.room = room
//     socket.join(room)
//   })
  
//   socket.on('signal', (data) => {
//     console.log('Signal from Peer', socket.id)
//     io.to(socket.room).emit('signal', data)
//   })
  
// })

app.get('/', (req, res) => res.send('Hello World'))

server.listen(port, () => console.log(`Listening on port ${port} `))
