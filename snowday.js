//Use regions and walkers to draw a snowflake
//Regions: Static distributions where points can be places
//Walkers: Dynamic points

//define range function
function range(start, end, step) {
    let arr = [];
    for (let v = start; v <= end; v += step) arr.push(v);
    return arr;
}

let regions = [
    //Main square
    {
        xs: range(175, 275, 5),
        ys: range(175, 275, 5)
    },

    //Northern spindle
    {
        xs: range(200, 250, 5),
        ys: range(50, 175, 5)
    },

    //Eastern spindle
    {
        xs: range(275, 400, 5),
        ys: range(200, 250, 5)
    },

    //Southern spindle
    {
        xs: range(200, 250, 5),
        ys: range(275, 400, 5)
    },
    //Western spindle
    {
        xs: range(50, 225, 5),
        ys: range(200, 250, 5)
    },

];

let diagonals = [
    //NW to SE
    {
        dxs: range(40, 410, 5),
    },
];

let vertical = [
    {
        vys: range(20, 430, 5),
    }
];

let horizontal = [
    {
        hxs: range(20, 430, 5),
    }
];

function setup() {
    createCanvas(450, 450).parent("canvas-holder");
    colorMode(HSB, 360, 100, 100, 1);
    background(265, 100, 50);
}

function randomHue() {
    let hues = [55, 30, 0, 325, 220];
    return random(hues);
}

function draw() {
    background(265, 100, 50, 0.008);
    stroke('white');
    strokeWeight(4);

    for (let r of regions) {
        stroke(randomHue(), 40, 100);
        point(random(r.xs), random(r.ys));
    }

    for (let d of diagonals) {
        stroke(randomHue(), 40, 100);
        dPt = random(d.dxs);
        point(dPt, dPt);
        point(dPt, 450 - dPt);
    }

    for (let v of vertical) {
        stroke(randomHue(), 40, 100);
        vPt = random(v.vys);
        point(225, vPt);
    }

    for (let h of horizontal) {
        stroke(randomHue(), 40, 100);
        hPt = random(h.hxs);
        point(hPt, 225);
    }
}
