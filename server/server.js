const express = require("express");
const socket = require('socket.io');
const app = express();
let Player = require("./Player");

let server = app.listen(80);
console.log('The server is now running at http://localhost/');
app.use(express.static("public"));


let io = socket(server);

let players = [];

let totalbutton1 = 0;
let totalbutton2 = 0;

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
    console.log("a user has disconnected");
  });
    
    
  socket.on('button', buttonMsg);
  //socket.on('button', buttonMsg2)

  function buttonMsg(buttonData) {
      if(buttonData == 1){
          totalbutton1++;
      }
      if(buttonData == 2){
          totalbutton2++;
      }
      let update = {"totalButton1": totalbutton1, "totalButton2":totalbutton2};
        socket.broadcast.emit('blob', update);
        console.log(update);
    }
    
    
//  function buttonMsg2(buttonData2) {
//        socket.broadcast.emit('button2', buttonData2);
//        console.log("value 2: ", buttonData2);
//    }
});

function updateGame() {
  io.sockets.emit("heartbeat", players);
}




