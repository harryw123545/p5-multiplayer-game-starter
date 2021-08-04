const socket = io.connect('http://localhost');

let players = [];

let val1, val2;
let population;
let info;
var osc = 0;


function setup() {
    socket.on("blob", (blob)=>{
    console.log(blob.totalButton1);
    console.log(blob.totalButton2);
    val1 = blob.totalButton1;
    val2 = blob.totalButton2;
          });
    
  createCanvas(window.400, 400);

}

function draw() {
  background(1);

    
  circle(100,150,val1%100);
  circle(200,150,val2%100);    
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

