const socket = io.connect('http://localhost');

let players = [];

let population;
let info;
var osc = 0;

let val1, val2;


function setup() {
    socket.on("blob", (blob)=>{
    console.log(blob.totalButton1);
    console.log(blob.totalButton2);
    val1 = blob.totalButton1;
    val2 = blob.totalButton2;
          });
    
  createCanvas(window.innerWidth, 200);
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  let popmax = 10;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // A simple button class
  button = createButton("evolve new generation");
  button.mousePressed(nextGen);
  button.position(10, height+50);
  info = createDiv('');
  info.position(10, height+25);
}

function draw() {
  background(1);
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
    
  circle(100,150,val1%100);
  circle(200,150,val2%100);    
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}
