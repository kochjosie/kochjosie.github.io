let prevX;
let prevY;

function setup() {
  const c = createCanvas(450, 450);
  c.parent("canvas-holder");   // MUST match the HTML id exactly

  colorMode(HSB);
  angleMode(DEGREES);
  background(236, 100, 10);

  document.getElementById("clear").addEventListener("click", () => {
    background(236, 100, 10);
  });
}

function draw() {
    let x = mouseX;
    let y = 225 - 30 * tan(3 * x);
    
    if (prevX !== undefined && prevY !== undefined) {
        strokeWeight(0.4);

        hue = (frameCount * 0.5) % 360;

        stroke(hue, 50, 100, 0.25);
        line(prevX, prevY, x, y);
    }

    prevX = x;
    prevY = y;
}