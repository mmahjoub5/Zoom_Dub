const express = require('express') //express framework
const cors = require('cors') //enable cors
const mongoose = require('mongoose') //mongodb
require('dotenv').config({path: __dirname + '/.env'}); //dotenv config
const app = express() //init app function

const server = require('http').createServer(app) //supply to http server
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection success")
})

const userRouter = require('./routes/users')
app.use('/user', userRouter)

const rooms = {}

//socket.on => handles event
//socket.emit => send back to client that creates event
//socket.to().emit => have socket talks to other sockets

io.on('connection', socket => {
  socket.on('join room', (roomId, userId) => { //joinroom
    if(rooms[roomId]) { //if room already existed, then add socket's id to the room's array of sockets
      rooms[roomId].push(socket.id);
    } else {
      rooms[roomId] = [socket.id] //if not, first person added into array
    }
    const otherUser = rooms[roomId].find(id => id !== socket.id); //find different people
    if(otherUser) { //if there are different people
      socket.emit("other user", otherUser); //let us know all the other users
      socket.to(otherUser).emit("user joined", socket.id); //let other users know who we are
    }
  });

  socket.on("offer", payload => { //facilitates handshake, send to person whom I'm calling
    io.to(payload.target).emit("offer", payload); 
    //emits offer event, payload includes my socket.id and my offer to other user
  });

  socket.on("answer", payload => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", incoming => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
})

server.listen(port, () => {
  console.log('Server running on port ', port)
})