const socket = io.connect('http://localhost');
let button1, button2;
//let button = [];
let val1 = 0;
let val2 = 0;

let val = [];


let players = [];
socket.on("heartbeat", players => updatePlayers(players));

function setup() {
  createCanvas(400, 400);
    
  button1 = createButton('option 1');
  button2 = createButton('option 2'); 

//  for(let i = 0; i < 10; i++){
//      button[i] = createButton('option ' + i + '');
//      button[i].position(i * 60 + 60, 0, 30);
//      button[i].mousePressed(buttonCount);
//  }
    
//  button1.position(0, 0);
//  button2.position(width/2, 0);
    
//  button1.mousePressed(buttonCount1);
//  button2.mousePressed(buttonCount2);
    
  socket.on('button', newButton);
  socket.on('button2', newButton2);
}

function draw() {
  //background(220);
  players.forEach(player => player.draw());
    
}


function newButton(buttonData) {
    fill(255, 100, 100);
    circle(0, height/2, buttonData % 200);
    console.log("received: ", buttonData);

}

function newButton2(buttonData2) {
    fill(255, 100, 100);
    circle(width/2, height/2, buttonData2 % 200);
    console.log("received: ", buttonData2);

}

function buttonCount1() {
 
  var buttonData = val1;
    
<<<<<<< HEAD
<<<<<<< HEAD
  //val1++;
    
  //console.log(val1);
=======
  val1++;
>>>>>>> parent of 6cc6ad6 (fixed button - added new files for animation)
=======
  val1++;
>>>>>>> parent of 6cc6ad6 (fixed button - added new files for animation)
  
  console.log("sent val1: ", buttonData);
  socket.emit('button', buttonData);
}

function buttonCount2() {
 
  var buttonData2 = val2;
    
  val2++;
  
  console.log("sent val2: ", buttonData2);
  socket.emit('button2', buttonData2);
}


function updatePlayers(serverPlayers) {
  let removedPlayers = players.filter(p => serverPlayers.findIndex(s => s.id == p.id));
  for (let player of removedPlayers) {
    removePlayer(player.id);
  }
  for (let i = 0; i < serverPlayers.length; i++) {
    let playerFromServer = serverPlayers[i];
    if (!playerExists(playerFromServer)) {
      players.push(new Player(playerFromServer));
    }
  }
}

function playerExists(playerFromServer) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === playerFromServer) {
      return true;
    }
  }
  return false;
}

function removePlayer(playerId) {
  players = players.filter(player => player.id !== playerId);
}
