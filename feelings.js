let feelingsArr = ['confused', 'curious', 'well-meaning', 'separated', 'unloved', 'naive', 'alien'];

function setup() {
    const c = createCanvas(450, 450);
    colorMode(HSB, 360, 100, 100);
    c.parent("canvas-holder-feelings");
}

function createBackground() {
    const hue = (Date.now() * 0.03) % 360;
    background(hue, 50, 85);
}

function draw() {
    createBackground();

    textFont('Times New Roman');
    textSize(40);
    fill(0, 0, 0);
    textAlign(LEFT);
    text('to feel...', 15, 40);

    const index = floor(millis() / 2000) % feelingsArr.length;
    textFont('Helvetica');
    textSize(70);
    fill(0, 0, 100);
    textAlign(CENTER);
    text(feelingsArr[index], 225, 225);
}