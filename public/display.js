const socket = io.connect('http://localhost');
let val1 = 0;
let val2 = 0;
var n1 = 0.3;
var n2 = 0.3;
var n3 = 0.3;
var m = 6;
var a = 1;
var b = 1;

var osc = 0;

let players = [];



function setup() {
  createCanvas(400, 400);
    socket.on("blob", (blob)=>{
    console.log(blob.totalButton1);
    console.log(blob.totalButton2);
    val1 = blob.totalButton1*10;
    val2 = blob.totalButton2*10;
          });
}

function superShape(theta) { 
    
    var part1 = (1 / a) * cos(theta * m/4);
    part1 = abs(part1);
    part1 = pow(part1, n2);
    
    var part2 = (1 / b) * sin(theta * m/4);
    part2 = abs(part2);
    part2 = pow(part2, n3);
    
    var part3 = pow(part1 + part2, 1/n1);
    
    if (part3 === 0){
        return 0;
    }
    return 1 / part3;
    
}

function draw() {
  m = map(sin(osc), -1, 1, 0, 10);
    
  osc += 0.01;
    
  background(51);
  translate(width/2, height/2);
    
  console.log(val1, val2);    
  stroke(255);
  fill(val1 % 255, val2 % 255, 100);
    
  var radius = 300;
    
  var total = 500;
  var increment = TWO_PI / total;
    
  beginShape();
    for(var angle = 0; angle < TWO_PI; angle += increment){
        var r = superShape(angle);
        var x = radius * r * cos(angle);
        var y = radius * r * sin(angle);
        
        vertex(x, y);
    }
  endShape(CLOSE);
}

