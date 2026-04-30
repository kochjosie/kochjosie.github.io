let squares = [];
let x;
let y;
let centers = [];
//let threshold = 10;  // what causes the blobiness of metaballs


function setup() {
  colorMode(HSB, 360, 100, 100, 1);
  let canvas = createCanvas(400, 400);
  let container = select(".canvas-container");
  canvas.parent(container);
  //frameRate(48);
  
  // square generation
  y = 0;
  for (let j = 0; j < 80; j++) {
    x = 0;
    for (let i = 0; i < 80; i++) {
      squares.push(new Square(x, y));
      x += 5;
    }
    y += 5;
  }
  
  // center generation
  for (let i = 0; i < 6; i++) {
    centers.push({
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2),
      s: random(3200, 7200)  // metaball radius or strength
    });
  }
}

function draw() {
  let indFieldResult;  // a squares field from ONE of the centers
  let totalField;  // the sum of the squares field from all centers
  background(0, 0, 100, 0.1);
  
  for (let s of squares) {
    totalField = 0;
    for (let c of centers) {
      indFieldResult = fieldFunction(s.x, s.y, c.x, c.y, c.s);
      totalField += indFieldResult;
    }
    s.show(totalField);
  }
  
  // center shifting
  for (let c of centers) {
    c.x += c.vx;
    c.y += c.vy;

    // bounce off walls
    if (c.x < 0 || c.x > width) {
      c.vx *= -1;
    }
    if (c.y < 0 || c.y > height) {
      c.vy *= -1;
    }
  }
}

// x and y are the individual points, xi and yi are the center points
function fieldFunction(x, y, xi, yi, radius) {
  let indFieldResult;
  let denominator;
  
  denominator = ((x - xi) ** 2) + ((y - yi) ** 2);
  
  return (radius ** 2 / max(denominator, 1));
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 5;
  }
  
  show(totalField) {
    noStroke();
    
    /*
    if (totalField > threshold) {
      fill(0, 0, 0, 1);
    } else {
      fill(0, 0, 100, 1);
    }
    */
    
    // field results are VERY high when close to the center and lower when far
    let fixedField = log(totalField + 1);
    let mappedField = map(fixedField, 0.1, 10, 360, 0);
    
    fill(330, mappedField, 100, 1);
    
    square(this.x, this.y, this.length);
  }
}