const { Server } = require('socket.io')

const app = require('express')()

// initializing http server
const httpServer = require('http').createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    }
})

io.on("connection", (socket)=>{

    // when user join room
    socket.on("join_room",(room_payload)=>{
        console.log(room_payload);
        // socket.to(room_payload.roomId).emit("join_room",true)
    })
    
    // sending & recieving message
    socket.on("send_message",(messagePayload)=>{
        const {roomId} = messagePayload
        console.log("roomId:",roomId);
        socket.broadcast.emit('recieve_message',messagePayload)
    })

    // disconnection
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    })
})

// socket server listening
httpServer.listen(8080, ()=>{
    console.log(`Server is listening on port: http://localhost:8080`);
})