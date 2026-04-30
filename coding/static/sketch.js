let squares = [];
let x;
let y;

function setup() {
  let canvas = createCanvas(400, 400);
  let container = select(".canvas-container");
  canvas.parent(container);
  colorMode(HSB, 360, 100, 100, 1);
  frameRate(8);
  
  y = 0;
  
  for (let j = 0; j < 20; j++) {
    x = 0;
    for (let i = 0; i < 20; i++) {
      squares.push(new Square(x, y));
      x += 20;
    }
    y += 20;
  }
}

function draw() {
  background(0, 0, 100, 1);
  
  for (let s of squares) {
    s.show();
  }
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 20;
  }
  
  show() {
    noStroke();
    fill(random(150, 250), 20, random(0, 100), 1);
    square(this.x, this.y, this.length);
  }
}