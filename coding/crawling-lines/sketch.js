let crawlers = [];
let x;
let y;
let xmax;
let ymax;
let xmin;
let ymin;
let vx;
let vy;

function setup() {
  let canvas = createCanvas(500, 500);
  let container = select(".canvas-container");
  canvas.parent(container);
  colorMode(HSB, 360, 100, 100, 1);
  background(265, 80, 25, 1);
  //crawler = new Pt(10, 10, 390, 390, 10, 10);
  
    x = 5;
    y = 5;
    xmax = 495;
    ymax = 495;
    xmin = 5;
    ymin = 5;
  
  for (let i = 0; i < 50; i++) {
    
    crawlers.push(new Pt(x, y, xmax, ymax, xmin, ymin));
    
    x += 5;
    y += 5;
    xmax -= 5;
    ymax -= 5;
    xmin += 5;
    ymin += 5;
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
  constructor(x, y, xmax, ymax, xmin, ymin) {
    this.x = x;
    this.y = y;
    this.xmax = xmax;
    this.ymax = ymax;
    this.xmin = xmin;
    this.ymin = ymin;
  }
  
  move() {
    vx = 1;
    vy = 0;
    
    // if about to hit the first wall, turn right
    if (this.x > this.xmax) {
      vx = 0;
      vy = 1;
    }
    
    if (this.y > this.ymax) {
      vx = -1;
      vy = 0;
    }
    
    if (this.x < this.xmin) {
      vx = 0;
      vy = -1;
    }
    
    if (this.y < this.ymin) {
      vx = 0;
      vy = 0;
    }

    this.x += vx;
    this.y += vy;
  }
  
  show() {
    strokeWeight(1.15);
    
    let hu = 20 * sin(millis() / 1000) % 65 + 40;
    
    if (vx == 0 && vy == 0) {
      noStroke();
    } else {
      stroke(hu, 58, 100, 1);
      point(this.x, this.y);
    }
  }
}