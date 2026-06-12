let container;
let rowSize = 10;
let columnSize = 10;
let squares = [];
let chars = ['*', '7', '&', 'j', 'c', 'k'];
let img;
function preload() {
  img = loadImage('horse-1.png');
  container = select(".canvas-container");
  img.resize(container.width, container.height);
}
function setup() {
  let canvas = createCanvas(container.width, container.height);
  canvas.parent(container);
  frameRate(1);
  textAlign(CENTER, CENTER);
  textSize(rowSize);
  
  let rows = floor(container.width / rowSize);
  let columns = floor(container.height / columnSize);
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
  
  img.resize(width, height);
  loadPixels();
  pixelateImg(img, columnSize);
}
function draw() {
  background(246, 248, 246, 200);
  
  //image(img, 0, 0, W, H);
  for (let s of squares) {
    let redIdx = getIndex(s.x, s.y, container.width);
    let r = img.pixels[redIdx];
    let g = img.pixels[redIdx + 1];
    let b = img.pixels[redIdx + 2];
    
    let randomChar = chars[floor(random(0, chars.length))]
    s.show(randomChar, r, g, b);
  }
}
function pixelateImg(img, blockSize) {
  img.loadPixels();  // fills img.pixels[]
  
  // OUTER LOOPS WALK ACROSS BLOCKS
  for (let j = 0; j < height; j += blockSize) {
    for (let i = 0; i < width; i += blockSize) {
      
      let r = 0;
      let g = 0;
      let b = 0;
      let ct = 0;
      
      // INNER LOOPS WALK WITHIN BLOCKS
      // dj/di = difference from first within a block
      for (let dj = 0; dj < blockSize; dj++) {
        for(let di = 0; di < blockSize; di++) {
          
          let redIdx = getIndex(i + di, j + dj, width);
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
          redIdx = getIndex(i + di, j + dj, width);
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
function windowResized() {
    resizeCanvas(container.width, container.height);
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
    let colorMag = sqrt(r**2 + g**2 + b**2);
    fill(colorMag);
    text(chosenChar, this.x + this.length / 2, this.y + this.length / 2);
  }
}