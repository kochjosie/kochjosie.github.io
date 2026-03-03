let walker;
let walkers = [];
let width = 31 * window.innerWidth / 100;
let height = 31 * window.innerWidth / 100;

function setup() {
  let canvas = createCanvas(width, height); //31 vw in js speak
  let container = select(".canvas-container");
  canvas.parent(container);
  colorMode(HSB, 360, 100, 100, 1);
  resetSketch();
  pushWalkers();
  background(268, 100, 13, 1);
}

function draw() {
  background(268, 100, 13, 0.13);
  for (let w of walkers) {
    w.step();
    w.pulse();
    w.show();
  }
}

function pushWalkers() {
  for (let i = 1; i < 601; i++) {
    walkers.push(new Walker());
  }
}

function resetSketch() {
  background(360, 0, 0, 1);
  walkers = [];
  pushWalkers();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetSketch();
  }
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }
  
  show() {
    strokeWeight(1.5);
    stroke(random(360), 100, 100, 1);
    point(this.x, this.y);
  }
  
  step() {
    let choice = floor(random(4));
    let velocity = random(1, 9)
    
    if (choice == 0) {
      this.x += velocity;
    } else if (choice == 1) {
      this.x -= velocity;
    } else if (choice == 2) {
      this.y += velocity;
    } else if (choice == 3) {
      this.y -= velocity;
    }
  }
  
  pulse() {
    let s = millis() / 1000;
    let lerpAmt = Math.sin(s) / 75;
    this.x = lerp(this.x, (width / 2), lerpAmt);
    this.y = lerp(this.y, (height / 2), lerpAmt);
  }
}