let height_main = window.innerHeight + 100;
let width_main = window.innerWidth + 100;
let button;

let particles = [];
const num = 10000;
const noiseScale = 0.01;

let isPlaying = true;

function setup() {
  createCanvas(width_main, height_main);
  // initialises particles using for loop
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  // set stroke to white so particles appear
  // stroke(random()*255, random()*255, random()*255);
  stroke(255);
  //set the size of the particles
  strokeWeight(0.75);
  // Button to stop start animation
  button = createButton("Play/Pause");
  // button.position(width_main / 2 - 90, (height_main / 10) * 8.3); // ternary to call resizeCanvas parameters?
  positionButton();
}

function positionButton() {
  let height_main = window.innerHeight + 100;
  let width_main = window.innerWidth + 100;
  button.position(width_main / 2 - 90, (height_main / 10) * 8.3125);

  let col_black = color(0, 0, 0, 0.4);
  let col_white = color(245, 245, 245);
  button.style("background-color", col_black);
  button.style("color", col_white);
  button.style("border", "none");

  button.mousePressed(() => {
    isPlaying = !isPlaying;
  });
}

function windowResized() {
  resizeCanvas(window.innerWidth + 100, window.innerHeight + 100);
  positionButton(); // button may be better suited to placement at top of screen
}

function draw() {
  if(isPlaying){
    background(0, 15); // if we give the background an alpha value we can see previous iterations

    // this is the for loop that animates everything
    for (let i = 0; i < num; i++) {
      // take i++ and put at bottom of function?
      let p = particles[i];
      point(p.x, p.y);
      // if we left the p.x, p.y values the noise would be super grainy - we'd be too zoomed out - noiseScale (0.01) zooms in
      let n = noise(p.x * noiseScale, p.y * noiseScale);
      // TAU = PI * 2
      let a = TAU * n;
      // Trigonometry, converting an angle to x and y
      p.x += cos(a); //* speedValue;
      p.y += sin(a);
      if (!onScreen(p)) {
        // if they;re not on screen, give them new random position
        p.x = random(width);
        p.y = random(height);
      }
    }
  }
}

// https://www.youtube.com/watch?v=CqDqHiamRHA // setTimeout || setInterval might be the best bet for the play/pause option in the p5.js sketch

// in Javascript, a 'for' loop is a sychronous operation that runs without yielding control back to the event loop until it completes. Therrefore, trying to create a play/pause button for a 'for' loop directly is challenging - to achieve a play/pause functionality, it's better to use asynchronous operations and utilize functions like 'setInterval' or 'requestAnimationFrame' - 'requestAnimationFrame' is more precise

function mouseReleased() {
  // generate a new noise seed on click
  noiseSeed(millis());
}

//Without this function our particles would just leave the screen
function onScreen(v) {
  // x has to be between 0 and width
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
