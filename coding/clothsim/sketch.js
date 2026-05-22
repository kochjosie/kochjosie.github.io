// GLOBALS (pls don't hate me whoever reads this)
let WIDTH = 800;
let HEIGHT = 600;
let RADIUS = 3; // radius of points
let GRAVITY, FRICTION, STIFFNESS;
 
let points = [];
let sticks = [];
let obstacle;
let sliders = [];
 
// CLASSES
class Point {
  constructor(x, y, pinned = false) {
    this.current_x = x;
    this.current_y = y;
    this.previous_x = x;
    this.previous_y = y;
    this.pinned = pinned;
    this.dragging = false;
  }
 
  update() {
    if (this.pinned) return;
 
    // VERLET INTEGRATION OF MOVEMENT
    let v_x = this.current_x - this.previous_x;
    let v_y = this.current_y - this.previous_y;
 
    this.previous_x = this.current_x;
    this.previous_y = this.current_y;
 
    this.current_x += v_x * FRICTION;
    this.current_y += (v_y * FRICTION) + GRAVITY;
 
    // FLOOR COLLISION CHECK
    if (this.current_y >= (HEIGHT - RADIUS)) {
      this.current_y = HEIGHT - RADIUS;
      this.previous_y = this.current_y;
    }
 
    // OBSTACLE COLLISION CHECK
    let dx = this.current_x - obstacle.x;
    let dy = this.current_y - obstacle.y;
    let distance = dist(0, 0, dx, dy);
    if (distance < obstacle.r && distance > 0) {
      let nx = dx / distance; // normalized x
      let ny = dy / distance; // normalized y
      this.current_x = obstacle.x + nx * obstacle.r;
      this.current_y = obstacle.y + ny * obstacle.r;
      this.previous_x = this.current_x;
      this.previous_y = this.current_y;
    }
  }
 
  draw() {
    fill(255);
    noStroke();
    circle(this.current_x, this.current_y, RADIUS * 2);
  }
}
 
class Stick {
  constructor(point_1, point_2) {
    this.point_1 = point_1;
    this.point_2 = point_2;
    this.length = dist(point_1.current_x, point_1.current_y,
                       point_2.current_x, point_2.current_y);
  }
 
  update() {
    let dx = this.point_2.current_x - this.point_1.current_x;
    let dy = this.point_2.current_y - this.point_1.current_y;
 
    let distance = dist(0, 0, dx, dy);
    if (distance === 0) return;
 
    let difference = (this.length - distance) / distance / 2 * STIFFNESS; // dividing by 2 maintains symmetry, each point gets half correction
    let offset_x = dx * difference;
    let offset_y = dy * difference;
 
    // POSITION-BASED ANALOG OF NEWTON'S THIRD LAW, ACTUALLY PULL THE POINTS BACK
    if (!this.point_1.pinned) {
      this.point_1.current_x -= offset_x;
      this.point_1.current_y -= offset_y;
    }
    if (!this.point_2.pinned) {
      this.point_2.current_x += offset_x;
      this.point_2.current_y += offset_y;
    }
  }
 
  draw() {
    stroke(200, 200, 255);
    line(this.point_1.current_x, this.point_1.current_y,
         this.point_2.current_x, this.point_2.current_y);
  }
}
 
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dragging = false;
  }
 
  draw() {
    fill(60, 80, 60);
    stroke(100, 160, 100);
    strokeWeight(2);
    circle(this.x, this.y, this.r * 2);
  }
}
 
class Slider {
  constructor(x, y, w, min_val, max_val, start, label) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.min = min_val;
    this.max = max_val;
    this.value = start;
    this.label = label;
    this.dragging = false;
  }
 
  knob() {
    let t = (this.value - this.min) / (this.max - this.min);
    return this.x + t * this.width; // slider pos
  }
 
  slide_on_event(type, mx, my) {
    if (type === 'press') {
      if (abs(mx - this.knob()) < 10 && abs(my - this.y) < 10) {
        this.dragging = true;
        return true;
      }
    }
    if (type === 'release') {
      this.dragging = false;
    }
    // BOUND THE SLIDER
    if (this.dragging) {
      let mouse_x = constrain(mouseX, this.x, this.x + this.width);
      let t = (mouse_x - this.x) / this.width;
      this.value = this.min + t * (this.max - this.min);
    }
  }
 
  draw() {
    fill(200);
    noStroke();
    textFont('monospace');
    textSize(13);
    text(`${this.label}: ${this.value.toFixed(3)}`, this.x, this.y - 6);
 
    // track bg
    stroke(100);
    strokeWeight(3);
    line(this.x, this.y, this.x + this.width, this.y);
 
    // track fill
    stroke(120, 180, 255);
    line(this.x, this.y, this.knob(), this.y);
 
    // knob
    fill(255, 100, 100);
    noStroke();
    circle(this.knob(), this.y, 16);
  }
}
 
// POINT, STICK, AND OBSTACLE GENERATION
let columns = 20;
let rows = 15;
let spacing = 20;
 
function find_index(x, y) {
  return x + y * columns;
}
 
function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  let container = select(".canvas-container");
  canvas.parent(container);
 
  // SLIDERS
  sliders.push(new Slider(20, 55, 160, 0, 2, 0.5, 'Gravity'));
  sliders.push(new Slider(20, 110, 160, 0.75, 1.0, 0.999, 'Friction'));
  sliders.push(new Slider(20, 165, 160, 0.1, 1.0, 1.0, 'Stiffness'));
 
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      // pin every third point of the top row
      let pinned = (y === 0 && x % 3 === 0);
      points.push(new Point(200 + x * spacing, 50 + y * spacing, pinned));
    }
  }
 
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (x < columns - 1) {
        sticks.push(new Stick(points[find_index(x, y)], points[find_index(x + 1, y)])); // SLIGHTLY TRICKY CODE HERE
      }
      if (y < rows - 1) {
        sticks.push(new Stick(points[find_index(x, y)], points[find_index(x, y + 1)]));
      }
    }
  }
 
  obstacle = new Circle(400, 300, 50);
}
 
function mousePressed() {
  let mx = mouseX, my = mouseY;
 
  // sliders first
  for (let s of sliders) {
    if (s.slide_on_event('press', mx, my)) return;
  }
 
  // DRAG OBSTACLE
  if (dist(mx, my, obstacle.x, obstacle.y) < obstacle.r) {
    obstacle.dragging = true;
  } else {
    for (let pt of points) {
      if (dist(pt.current_x, pt.current_y, mx, my) < 10) {
        pt.dragging = true;
        break; // break required to ensure we only snatch one set of coordinates
      }
    }
  }
}
 
// RELEASE DRAG
function mouseReleased() {
  obstacle.dragging = false;
  for (let pt of points) pt.dragging = false;
  for (let s of sliders) s.slide_on_event('release', 0, 0);
}
 
// RUN
function draw() {
  background(20, 30, 30);
 
  GRAVITY = sliders[0].value;
  FRICTION = sliders[1].value;
  STIFFNESS = sliders[2].value;
 
  // READ SLIDERS
  for (let s of sliders) s.slide_on_event('drag', mouseX, mouseY);
 
  if (obstacle.dragging) {
    obstacle.x = mouseX;
    obstacle.y = mouseY;
  }
 
  for (let pt of points) {
    if (pt.dragging) {
      pt.current_x = mouseX;
      pt.current_y = mouseY;
    }
    pt.update();
  }
 
  // sticks are updated multiple times per frame, lets the "mesh" feel like a mesh
  for (let i = 0; i < 5; i++) {
    for (let s of sticks) s.update();
  }
 
  obstacle.draw();
 
  strokeWeight(1);
  for (let s of sticks) s.draw();
 
  noStroke();
  for (let pt of points) pt.draw();
 
  for (let s of sliders) s.draw();
}