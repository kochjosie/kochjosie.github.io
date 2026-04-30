// UNITS: NEWTONS, KILOGRAMS, PIXELS, SECONDS (see comments for meters vs. pixels)

const W = 500;  // pixels
const H = 500;  // pixels
const PADDING = 100;  // pixels of padding

const PIXELS_PER_METER = 2;  // !! SCALE !!
const THICKNESS = 5;  // thickness of sticks in pixels
const FABRIC_THICKNESS = 0.0005;  // real-world thickness of fabric in meters

const POINT_MASS = 1;  // kilogram
const DELTA_TIME = 0.08;  // seconds
const GRAVITY = 9.8 * PIXELS_PER_METER;  // pixels per seconds squared

let points = [];
let sticks = [];

function setup() {
  let canvas = createCanvas(W, H);
  let container = select(".canvas-container");
  canvas.parent(container);

  colorMode(HSB, 360, 100, 100, 1);
  strokeWeight(THICKNESS);
  // frameRate(1);  // 1 frame per second
  
  let x = PADDING;
  let y = PADDING;
  
  let rows = 5;
  let columns = 5;
  
  let columnSize = (W - (PADDING * 2)) / columns;
  let rowSize = (H - (PADDING * 2)) / rows;
  
  // generate points
  for (let j = 0; j < rows; j++) {
    x = PADDING;
    for (let i = 0; i < columns; i++) {
      if (!isPinned(i, j)) {
        points.push(new Point(x, y, 1));
      } else if (isPinned(i, j)) {
        points.push(new Point(x, y, 0));
      }
      x += columnSize;
    }
    y += rowSize;
  }
  
  // generate sticks
  for (j = 0; j < rows; j++) {
    for (i = 0; i < columns; i++) {
      let n = i + j * columns;
      
      if (i < columns - 1) {
        sticks.push(new Stick(points[n], points[n+1]));
      }
      
      if (j < rows - 1) {
        sticks.push(new Stick(points[n], points[n + columns]));
      }
    }
  }
}

function draw() {
  background(100, 0, 100, 1);
  
  // reset acceleration
  for (let p of points) {
    p.ax = 0;
    p.ay = GRAVITY;
  }
  
  for (let s of sticks) {
    s.applySpringForce(7.9);  // cotton in GPa
  }
  
  for (let p of points) {
    p.applyForces();
    p.show();
  }
  
  for (let s of sticks) {
    s.show();
  }
}

function isPinned(i, j) {
  let isPinned;
  
  if (i == 0 && j == 0) {
    isPinned = true;
  } else if (i == 4 && j == 0) {
    isPinned = true;
  } else {
    isPinned = false;
  }
  
  return isPinned;
}

class Point {
  constructor(x, y, dynamic, vx = 0, vy = 0) {
    this.x = x;
    this.y = y;
  
    this.xPrev = x - (vx * DELTA_TIME);
    this.yPrev = y - (vy * DELTA_TIME);
  
    this.dynamic = dynamic;  // 1 = dynamic, 0 = not
    
    this.ax = 0;
    this.ay = GRAVITY;
  }
  
  applyForces() {   
    // NEWTON'S SECOND LAW
    let fx = POINT_MASS * this.ax;
    let fy = POINT_MASS * this.ay;
    
    // VERLET INTEGRATION
    if (this.dynamic) {
      this.x = (2 * this.x) - this.xPrev + (this.ax * DELTA_TIME * DELTA_TIME);
      this.y = (2 * this.y) - this.yPrev + (this.ay * DELTA_TIME * DELTA_TIME);
    }
    
    this.xPrev = this.x;
    this.yPrev = this.y;
    
    // hit the floor
    if (this.y > H) {
      this.y = H;
      this.yPrev = this.y;
    }
  }
  
  show() {
    point(this.x, this.y);
  }
}

class Stick {
  constructor(point1, point2) {
    // copy initial points for rest length
    this.restLength = dist(point1.x, point1.y, point2.x, point2.y);
    this.restLengthM = this.restLength / PIXELS_PER_METER;

    this.p1 = point1;
    this.p2 = point2;
    this.length = dist(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    this.area = THICKNESS * FABRIC_THICKNESS;
  }
  
  applySpringForce(youngsModulus) {
    youngsModulus *= (10**9);  // Data set in GPa -> N/m^2
    let k = youngsModulus * this.area / this.restLength;
    
    // update current length
    let length = dist(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    let stretch = this.length - this.restLength;
    let springForce = -k * stretch;  // Hooke's Law
    
    // VECTOR SCALING
    let dx = this.p2.x - this.p1.x;
    let dy = this.p2.y - this.p1.y;
    let d = sqrt(dx**2 + dy**2);
    let fx = springForce * (dx/d);
    let fy = springForce * (dy/d);
    
    // NEWTON'S SECOND AND THIRD LAW
    this.p1.ax += fx / POINT_MASS;
    this.p1.ay += fy / POINT_MASS;
    this.p2.ax -= fx / POINT_MASS;
    this.p2.ay -= fy / POINT_MASS;
  }
  
  show() {
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}