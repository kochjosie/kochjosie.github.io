let xs = [];
let ys= [];

for (let x = 5; x <= 445; x += 7) {
    xs.push(x)
    ys.push(0);
}

let wind = [-1,-2,-3,0,1,2,3];    //x values are affected by the wind
let fall = [1,2,3];             //y values are affected by gravity so they shouldn't change TOO much

function setup() {
  const c = createCanvas(450, 450);
  c.parent("canvas-holder");   // MUST match the HTML id exactly

  colorMode(HSB, 360, 100, 100, 1);
  angleMode(DEGREES);
  background(236, 100, 50);
}

function draw() {
    background(236, 100, 50, 0.9); //add alpha for softer look
    stroke('white');
    
    for (let i = 0; i < xs.length; i++) {
        point(xs[i], ys[i]);
        xs[i] += random(wind);
        ys[i] += random(fall);
    }
}