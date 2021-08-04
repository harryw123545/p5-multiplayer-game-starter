const express = require("express");
const socket = require('socket.io');
const app = express();
let Player = require("./Player");

let server = app.listen(80);
console.log('The server is now running at http://localhost/');
app.use(express.static("public"));


let io = socket(server);

let players = [];

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
    console.log("a user has disconnected");
  });
    
    
  socket.on('button', buttonMsg)
  socket.on('button2', buttonMsg2)

  function buttonMsg(buttonData) {
        socket.broadcast.emit('button', buttonData);
        console.log("value 1: ", buttonData);
    }
    
    
  function buttonMsg2(buttonData2) {
        socket.broadcast.emit('button2', buttonData2);
        console.log("value 2: ", buttonData2);
    }
});

function updateGame() {
  io.sockets.emit("heartbeat", players);
}




