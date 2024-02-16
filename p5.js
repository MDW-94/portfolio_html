// function setup() {
//     createCanvas(window.innerWidth+100, window.innerHeight+100);
//     // +100 just for complete coverage for now - p5 needs updateable draw function
// }

// function draw() {
//     background(200, 239, 200);
//     windowResized();
// }

// https://toolness.github.io/p5.js-widget/
// https://developer.mozilla.org/en-US/docs/Web/API/window/innerWidth

// https://p5js.org/get-started/#:~:text=The%20easiest%20way%20to%20start%20is%20by%20using%20the%20empty,the%20p5.js%20complete%20download.&text=If%20you%20look%20in%20index,to%20p5.min.js.

// Flow Fields!

// https://codepen.io/giaco/pen/RzERNL
// this one is incredibly fast, does it use Processing?

// Example of background - Do not use!

/*
 * @name Particles
 * @arialabel Small light grey circles connected by thin lines floating around a black background
 * @description There is a light-weight JavaScript library named
 * particle.js which creates a very pleasing particle system.
 * This is an attempt to recreate that particle system using p5.js.
 * Inspired by Particle.js, contributed by Sagar Arora.
 */

// this class describes the properties of a single particle.
// class Particle {
// //     // setting the co-ordinates, radius and the
//     // speed of a particle in both the co-ordinates axes.
//       constructor(){
//         this.x = random(0,width);
//         this.y = random(0,height);
//         this.r = random(1,8);
//         this.xSpeed = random(-2,2);
//         this.ySpeed = random(-1,1.5);
//       }

//     // creation of a particle.
//       createParticle() {
//         noStroke();
//         fill('rgba(200,169,169,0.5)');
//         circle(this.x,this.y,this.r);
//       }

//     // setting the particle in motion.
//       moveParticle() {
//         if(this.x < 0 || this.x > width)
//           this.xSpeed*=-1;
//         if(this.y < 0 || this.y > height)
//           this.ySpeed*=-1;
//         this.x+=this.xSpeed;
//         this.y+=this.ySpeed;
//       }

//     // this function creates the connections(lines)
//     // between particles which are less than a certain distance apart
//       joinParticles(particles) {
//         particles.forEach(element =>{
//           let dis = dist(this.x,this.y,element.x,element.y);
//           if(dis<85) {
//             stroke('rgba(255,255,255,0.04)');
//             line(this.x,this.y,element.x,element.y);
//           }
//         });
//       }
//     }

//     // an array to add multiple particles
//     let particles = [];

//     function setup() {
//     createCanvas(window.innerWidth+100, window.innerHeight+100);
//       for(let i = 0;i<width/10;i++){
//         particles.push(new Particle());
//       }
//     }

//     function draw() {
//       background('#0f0f0f');
//       for(let i = 0;i<particles.length;i++) {
//         particles[i].createParticle();
//         particles[i].moveParticle();
//         particles[i].joinParticles(particles.slice(i));
//       }
//     }

// --------------------------

const height_main = window.innerHeight + 100;
const width_main = window.innerWidth + 100;

let particles = [];
const num = 10000;
const noiseScale = 0.01;

function setup() {
  createCanvas(width_main, height_main);
  // initialises particles using for loop
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  // set stroke to white so particles appear
  stroke(255);
  //set the size of the particles
  strokeWeight(1);

  // Button to stop start animation
  let button = createButton('Play/Pause');
  button.position(width_main/2 -90, (height_main/10)*8.4125);
  let col_black = color(0, 0, 0, 0.4);
  let col_white = color(245, 245, 245);
  button.style('background-color', col_black);
  button.style('color', col_white);
  button.style('border', 'none');

  button.mousePressed(() => {
    // code body
  })
}

function windowResized() {
  resizeCanvas(window.innerWidth + 100, window.innerHeight + 100);
}

function draw() {
  background(0, 10); // if we give the background an alpha value we can see previous iterations

  // this is the for loop that animates everything
  for (let i = 0; i < num; i++) {
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

function mouseReleased(){
  // generate a new noise seed on click
  noiseSeed(millis());
}

//Without this function our particles would just leave the screen
function onScreen(v) {
  // x has to be between 0 and width
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
