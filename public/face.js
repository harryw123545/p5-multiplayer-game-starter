// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// The class for our "face", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)

// Create a new face
class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = 100; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);

  }
    
  update() {
    this.time = frameCount*0.04;
    this.iter = map(mouseX, 0, width, 0.1, 0.9);
   }

  // Display the face
  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let r = map(genes[2], 0, 1, 15, 50);
    let c = color(genes[1], genes[2], genes[3]);
      
    var n1 = map(genes[1], 0, 1, 0.1, 2);
    var n2 = map(genes[2], 0, 1, 0.1, 1);
    var n3 = map(genes[3], 0, 1, 0.01, 0.1);
    var m = map(genes[4], 0, 1, 1, 10);
    var iter = map(genes[5], 0, 1, 0, 180);
    var a = 1;
    var b = 1;
    osc += 0.001;


    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    noStroke();

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
      m = map(sin(osc), -1, 1, 0, 3) + iter;
      
      console.log(osc);

      fill(c);
      
      var radius = 30;

      var total = 50;
      var increment = TWO_PI / total;

      beginShape();
        for(var angle = 0; angle < TWO_PI; angle += increment){
            var rad = superShape(angle);
            var x = r * rad * cos(angle);
            var y = r * rad * sin(angle);

            vertex(x, y);
        }
      endShape(CLOSE);
      

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y + 65);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}





