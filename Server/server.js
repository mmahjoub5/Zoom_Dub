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

//Message model
const Message = require('./models/message.model.js')

//object
/* 
    {
        roomId: [socket1, socket2],
        roomId2: [socket3, socket4, socket5]
    }
*/
const users = {};

//object
/* 
    {
        socketId1: room1,
        socketId2: room2
    }
*/
const socketToRoom = {}; //map of socketID to roomID

//socket.on => handles event
//socket.emit => send back to client that creates event
//socket.to().emit => have socket talks to other sockets

io.on('connection', socket => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom); //when client joins, server sends back all users
    });

    socket.on("sending signal", payload => {
        console.log("User to signal ", payload.userToSignal);
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        console.log("Caller ID ", payload.callerID);
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

    socket.on('message', (msg) => {
        //create message event with msg object sent via event
        console.log(msg);
        const message = new Message({
            content: msg.content,
            email: msg.email
        });

        const roomID = socketToRoom[socket.id]; //current socketid -> roomid
        for (var i = 0; i < users[roomID].length; i++) {
            console.log(users[roomID][i]);
            //key is socket id, room is roomid
            if(users[roomID][i] !== socket.id) {
                io.to(users[roomID][i]).emit('push', message);
            }
        }
    })
    console.log("SOCKETS TO ROOM: ", socketToRoom);
    console.log("USERS BY ROOM: ", users);
});

server.listen(port, () => {
  console.log('Server running on port ', port)
})