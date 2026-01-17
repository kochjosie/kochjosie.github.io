let bezierPts = []; //Heart outline
let boundingMinX, boundingMinY, boundingMaxX, boundingMaxY; //Bounding box
let insidePts = []; //Points that have been tested and confirmed to be in the heart
let hue;
let currentPts = []; //Starter points generated each time our program runs so that we have something consistent to change during draw()

function setup() {
    createCanvas(450, 450).parent("canvas-holder");
    colorMode(HSB, 360, 100, 100, 1);
    background(100, 0, 100);

    createBezierOutline();
    createBoundingBox();
    populateInside(15000);

    for (heartPt of insidePts) {
        stroke(randomHue(), 70, 90, 1);
        strokeWeight(0.2);
        point(heartPt.x, heartPt.y);
        currentPts.push({x: heartPt.x, y: heartPt.y});
    }
}

function draw() {
    /*RECORD GIF OF SKETCH
    if (frameCount === 1) {
        const capture = P5Capture.getInstance();
        capture.start({
        format: "gif",
        duration: 5000,
        });
    }*/

    background(100, 0, 100, 0.05);
    for (pt of currentPts) {
        /*movement function: xf = xi + vx; yf = yi + vy
        use lerp to pull back to the center
        use trig to pull in and out with the amt of lerp and millis()*/
        let vx = random(-0.1, 0.1);
        let vy = random(-0.1, 0.1);
        pt.x += vx;
        pt.y += vy;
        
        let sec = millis() / 1000;

        lerpAmt = Math.sin(sec) / 125;
        
        pt.x = lerp(pt.x, random(150, 300), lerpAmt);
        pt.y = lerp(pt.y, random(150, 300), lerpAmt);
        stroke(randomHue(), 70, 90, 1);
        point(pt.x, pt.y);
    }
}

function createBezierOutline() {
    for (let t = 0; t <= 100; t++) {
        let x = bezierPoint(225, -150, 200, 225, t/100);
        let y = bezierPoint(400, -50, 0, 150, t/100);
        bezierPts.push({ x: x, y: y });
    }

    for (let t = 0; t <= 100; t++) {
        let x = bezierPoint(225, 250, 600, 225, t/100);
        let y = bezierPoint(150, 0, -50, 400, t/100);
        bezierPts.push({ x: x, y: y });
    }
}

function createBoundingBox() {
    let xs = bezierPts.map(p => p.x);
    let ys = bezierPts.map(p => p.y);

    boundingMaxX = Math.max(...xs); //Need to be global
    boundingMaxY = Math.max(...ys);
    boundingMinX = Math.min(...xs);
    boundingMinY = Math.min(...ys);
}

/*yes no test
This function answers a specific question and returns a specific value.
This is why you need to pass pt as a parameter. It serves as a placeholder 
for all the points we're going to input.*/

function pointInHeart(pt) {
    let inside = false;

    /*As long as the current counter is less than the number of points in the bezier points 
    array, keep iterating through the following instructions.*/

    for (let current = 0, previous = bezierPts.length - 1; current < bezierPts.length; 
        previous = current++) {
            let xc = bezierPts[current].x;  //locally assign the current x to the x at the index of bezierPts that's at the current counter
            let yc = bezierPts[current].y;  
            let xp = bezierPts[previous].x;
            let yp = bezierPts[previous].y;

            let existsInBoth =
                /*If I draw a horizontal line to the right from 'pt' (point taken from bezierPts at specific index),
                does this edge (from previous to current) cross that line?
                (edge crosses pt.y vertically) AND (edge crosses to the right of pt.x)*/
                (yc > pt.y) != (yp > pt.y) &&
                (pt.x < (xp - xc) * (pt.y - yc) / (yp -yc) + xc);

            if (existsInBoth) inside = !inside; //flip to true
        }
        return inside;  //value handed back to whoever called the function
}

/*This function answers a specific question and returns a specific value.
This is why you need pass n as a parameter. It's shorthand for number. Specifically, 
it's the number of points you want to generate. When we call this function, we pass in a number, 
but for now we don't know (as of writing).*/
function populateInside(n) {
    while (insidePts.length < n) {
        let heartPt = {
            x: random(boundingMinX, boundingMaxX),
            y: random(boundingMinY, boundingMaxY)
        };
        if (pointInHeart(heartPt)) {
            insidePts.push(heartPt);
        }
    }
}

function randomHue() {
    let hueRanges = [
        [290, 360],
        [0, 10]
    ];
    let hue = random(random(hueRanges));
    return hue;
}