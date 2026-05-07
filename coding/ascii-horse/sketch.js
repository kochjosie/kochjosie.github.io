const W = 500;
const H = 500;
let rowSize = 10;
let columnSize = 10;
let squares = [];
/*let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', '+', '-', "*", '&'];*/
let chars = ['*', '7', '&', 'j', 'c', 'k'];
let img;

function preload() {
  img = loadImage('horse.png');
}

function setup() {
  let canvas = createCanvas(W, H);
  let container = select(".canvas-container");
  canvas.parent(container);
  //colorMode(HSB, 360, 100, 100, 1); cool things occur when you mess with this
  frameRate(2);
  textAlign(CENTER, CENTER);
  textSize(rowSize)
  background(255, 255, 255, 255);
  
  let rows = floor(W / rowSize);
  let columns = floor(H / columnSize);

  // square generation
  y = 0;
  for (let j = 0; j < columns; j++) {
    x = 0;
    for (let i = 0; i < rows; i++) {
      squares.push(new Square(x, y));
      x += columnSize;
    }
    y += rowSize;
  }
  
  img.resize(W, H);
  loadPixels();
  reducePixels(img, columnSize);
}

function draw() {
  background(255, 255, 255, 65);
  
  //image(img, 0, 0, W, H);

  for (let s of squares) {
    let redIdx = getIndex(s.x, s.y, W);
    let r = img.pixels[redIdx];
    let g = img.pixels[redIdx + 1];
    let b = img.pixels[redIdx + 2];
    
    let toFill = floor(random(0, 2));
    if (toFill) {
      let randomChar = chars[floor(random(0, chars.length))]
      s.show(randomChar, r, g, b);
    } else {
      s.show(' ', 255, 255, 255);
    }
  }
}

function reducePixels(img, blockSize) {
  img.loadPixels();  // fills img.pixels[]
  
  // OUTER LOOPS WALK ACROSS BLOCKS
  for (let j = 0; j < H; j += blockSize) {
    for (let i = 0; i < W; i += blockSize) {
      
      let r = 0;
      let g = 0;
      let b = 0;
      let ct = 0;
      
      // INNER LOOPS WALK WITHIN BLOCKS
      // dj/di = difference from first within a block
      for (let dj = 0; dj < blockSize; dj++) {
        for(let di = 0; di < blockSize; di++) {
          
          let redIdx = getIndex(i + di, j + dj, W);
          r += img.pixels[redIdx];
          g += img.pixels[redIdx + 1];
          b += img.pixels[redIdx + 2];
          ct++;
          
        }
      }
      r /= ct;
      g /= ct;
      b /= ct;
      
      // UPDATE ARRAY
      for (let dj = 0; dj < blockSize; dj++) {
        for (let di = 0; di < blockSize; di++) {
          redIdx = getIndex(i + di, j + dj, W);
          img.pixels[redIdx] = r;
          img.pixels[redIdx + 1] = g;
          img.pixels[redIdx + 2] = b;
        }
      }
    }
  }
  img.updatePixels();
  //console.log(pixels);
}

function getIndex(x, y, imgWidth) {
  let redIdx = 4 * (y * imgWidth + x);
  return redIdx;
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = rowSize;
  }
  
  show(chosenChar, r, g, b) {
    //stroke(0, 0, 50, 1);
    noStroke();
    fill(r, g, b)
    text(chosenChar, this.x + this.length / 2, this.y + this.length / 2);
    //square(this.x, this.y, this.length);
  }
}