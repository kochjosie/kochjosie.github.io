let moving = [];
let frozen = [];

let wind = [-2, -1, 0, 1, 2];
let fall = [1, 2, 3];

function setup() {
  createCanvas(450, 450).parent("canvas-holder");
  colorMode(HSB, 360, 100, 100, 1);

  // seed: start with a frozen "ground" line (cheap + gives something to stick to)
  for (let x = 0; x < width; x += 3) {
    frozen.push({ x, y: height - 1 });
  }
}

function draw() {
  background(236, 100, 50, 0.15);
  stroke(0, 0, 100);

  // spawn a few new moving flakes each frame
  for (let k = 0; k < 3; k++) {
    moving.push({ x: random(width), y: random(-20, 0) });
  }

  // draw frozen once per frame
  for (let s of frozen) point(s.x, s.y);

  // update moving, and when they touch frozen -> move them to frozen
  for (let i = moving.length - 1; i >= 0; i--) {
    let f = moving[i];

    point(f.x, f.y);
    f.x += random(wind);
    f.y += random(fall);

    // bounds wrap (optional)
    if (f.x < 0) f.x += width;
    if (f.x > width) f.x -= width;

    // check contact ONLY against frozen (still can get big, but much better)
    let stuck = false;
    for (let s of frozen) {
      if (dist(f.x, f.y, s.x, s.y) < 2) {
        stuck = true;
        break;
      }
    }

    if (stuck || f.y > height) {
      frozen.push({ x: f.x, y: min(f.y, height - 1) });
      moving.splice(i, 1);
    }
  }

  // safety cap so frozen can't grow forever while you're experimenting
  if (frozen.length > 4000) frozen.splice(0, frozen.length - 4000);
}
