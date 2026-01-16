let xmain = [];
let ymain= [];
let xn = [];
let yn = [];
let xs = [];
let ys= [];
let xe = [];
let ye = [];
let xw = [];
let yw = [];

let xse = 0;
let yse = 0;
let xne = 0;
let yne = 450;
let xns = 225;
let yns = 0;
let xew = 0;
let yew = 225;

for (let x = 175; x <= 275; x += 5) {
    xmain.push(x)
}

for (let y = 175; y <= 275; y += 5) {
    ymain.push(y);
}

for (let x = 200; x <= 250; x += 5) {
    xn.push(x);
    xs.push(x);
}

for (let y = 50; y <= 175; y += 5) {
    yn.push(y);
}

for (let y = 276; y <= 400; y += 5) {
    ys.push(y);
}

for (let x = 50; x <= 174; x+= 5) {
    xe.push(x);
}

for (let y = 200; y <= 250; y += 5) {
    ye.push(y);
    yw.push(y);
}

for (let x = 276; x <= 400; x += 5) {
    xw.push(x);
}

function setup() {
  createCanvas(450, 450).parent("canvas-holder");
  colorMode(HSB, 360, 100, 100, 1);
  background(236, 100, 50);
}

function draw() {
  stroke(0, 0, 100);
  strokeWeight(4);
  background(236, 100, 50, 0.0012);

  point(random(xmain), random(ymain));
  point(random(xn), random(yn));
  point(random(xn), random(ys));
  point(random(xe), random(ye));
  point(random(xw), random(yw));

  point(xse, yse);
  xse += 5;
  yse += 5;

    point(xne, yne);
    xne += 5;
    yne -= 5;

    point(xns, yns);
    yns += 5;

    point(xew, yew);
    xew += 5;


  //actually draw the points and add wind and fall noise
  //for (let i = 0; i < xs.length; i++) {
    //point(xs[i], ys[i]);
    //xs[i] += random(dx);
    //ys[i] += random(dy);

    //}
}
