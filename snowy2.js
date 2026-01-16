let flakes = [];
let wind = [-2, -1, 0, 1, 2];
let fall = [1, 2, 3];

function setup() {
  createCanvas(450, 450).parent("canvas-holder");
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  background(236, 100, 50, 0.95);
  stroke('white');

  //continuously create new points with x being random between 0 and 450 and y between -20 and 0
  for (let k = 0; k < 3; k++) {
    flakes.push({ x: random(width), y: random(-20, 0) });
  }

  //actually draw the points and add wind and fall noise
  for (let f of flakes) {
    point(f.x, f.y);
    f.x += random(wind);
    f.y += random(fall);
  
    if (f.y > 450) {
    point(random(width), 450);
    }

    }
}
