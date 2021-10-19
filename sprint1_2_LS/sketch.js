let song;
let particles = [];
let bg;
let cursor;

//In this sprint, I used a function from a previous project which created the drifting particle system,. then added
//it to the song loader. I wanted to be able to change the background to black when the song was paused,
//but I couldn't figure it out. It may be that the canvas is taken up by the function and the background
// is hidden behind it?
function setup() {
  song = loadSound('assets/assets_audio_90210I.mp3');
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 130; i++) {
      //for (let i = 0; i < 600; i++) {
      particles.push(new Particle(createVector(random(width), random(height))));
  }
  //colour mode change
  colorMode(HSB, 255, 255, 255);
  h = random(255);
  s = random(255);
  b = random(255);
}
function draw() {
  clear();

  let p;
  for (let i = particles.length - 1; i >= 0; i--) {
      p = particles[i];
      p.run();

  }

}

//////////////////////PARTICLE CLASS///////////////////

let Particle = function (position) {
  // this.acceleration = createVector(5, 0.05);
  this.acceleration = createVector(0, 0.05);

  //altered speed of the links to make them dart around faster
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  // this.velocity = createVector(random(-5, 5), random(-5, 5));
  this.position = position.copy();
};

Particle.prototype.run = function () {
  this.update();
  this.display();
  this.intersects();
};

// Method to update position
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(-0.1);
  if (this.position.x < 0) this.position.x = width;
  if (this.position.x > width) this.position.x = 0;
  if (this.position.y < 0) this.position.y = height;
  if (this.position.y > height) this.position.y = 0;
};

// Method to work out collisions and line proximity
Particle.prototype.intersects = function () {
  for (let i = 0; i < particles.length; i++) {
      let other = particles[i];
      let dir;
      if (other != this) {
          dir = p5.Vector.sub(this.position, other.position);
          if (dir.mag() < 12) {
              dir.setMag(0.2);
              //dir.setMag(4);
              this.applyForce(dir);
          }
          //https://p5js.org/reference/#/p5/random
          // if (dir.mag() < 100) {
          //   if (dir.mag() < 250) {
          if (dir.mag() < 100) {
              //noStroke();
              stroke(h, s, b, 50);
              strokeWeight(0.2);
              line(this.position.x, this.position.y, other.position.x, other.position.y);
          }
      }
  }
};

Particle.prototype.applyForce = function (f) {
  this.acceleration.add(f);
};

// Method to display
Particle.prototype.display = function () {
  stroke(10, 10);
  fill(h, s, b);
  //https://www.w3schools.com/tags/ref_canvas.asp
  ellipse(this.position.x, this.position.y, 5, 5);
  let mPos = createVector(mouseX, mouseY);
  let dir = p5.Vector.sub(this.position, mPos);
  if (dir.mag() < 140) {
      // if (dir.mag() < 3000) {
      //  noStroke();
      stroke(h, s, b);
      strokeWeight(0.2);
      line(this.position.x, this.position.y, mouseX, mouseY);
  }
};
function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause();
    background(255,255,255);
  } else {
    song.play();
    background(0,0,0);
  }
}
