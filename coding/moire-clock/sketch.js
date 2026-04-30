let crawlers = [];
let x;
let y;
let radius;

function setup() {
  let canvas = createCanvas(400, 400);
  let container = select(".canvas-container");
  canvas.parent(container);
  colorMode(HSB, 360, 100, 100, 1);
  background(265, 80, 25, 1);
  //crawler = new Pt(10, 10, 390, 390, 10, 10);
  
    x = 100;
    y = 100;
    radius = 275;
  
  for (let i = 0; i < 250; i++) {
    
    crawlers.push(new Pt(x, y, radius));
    
    x += 10;
    y += 10;
    radius *= 0.98;
  }
}

function draw() {
  background(250, 80, 25, 0);
  
  for (let c of crawlers) {
    c.move();
    c.show();
  }
  
}

class Pt {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.r = radius;
  }
  
  move() {
    let angularSpeed = 1;
    let vx = -1 * this.r * angularSpeed * sin(angularSpeed * millis() / 1000);
    let vy = 1 * this.r * angularSpeed * cos(angularSpeed * millis() / 1000);

    this.x = 200 + vx;
    this.y = 200 + vy;
  }
  
  show() {
    strokeWeight(4);
    
    let hu = (75 * sin(millis() / 1000)) % 360;
    
    stroke(100 * sin(this.x), 58, 100, 1);
    point(this.x, this.y);
  }
}