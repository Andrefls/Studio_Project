//ADDING AND MOVING PARTICLES (CONSTRUCTOR EXAMPLE FROM CLASS)

var song;
var vol;
var amp;
var fft;
var img;

//Setting up new variable
//Creating an empty array

var particles = [];
var r = 0;
var g = 50;
var b = 100;
var x = 0;
var y = 0;
var spectrum;

function preload() {
  song = loadSound('sound/cockatoo.mp3');
  img = loadImage('images/frog.png');
}

function setup() {
  createCanvas(600, 600);

// setting up definitions to retrieve data
  amp = new p5.Amplitude();
  fft = new p5.FFT();

// loop and play
  song.play();
  song.loop();

// setting up new particles and movement
  x = random(width);
  y = random(height);
  for (var i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(220);

// Drawing the values I have retrieve from sound
  vol = amp.getLevel();
  spectrum = fft.analyze();

// Drawing amplitude
  fill(255, 0, 0);
  noStroke();
  rect(10, 10, vol * 100, 20);

// Drawing frequency
// Creating an spectrum array that loo
// Map the frequency spectrum to the color values
r = map(spectrum[20], 0, 255, 235, 150);
g = map(spectrum[50], 0, 255, 64, 234);
b = map(spectrum[80], 0, 255, 80, 234);

// Move the frog randomly
  x = map(spectrum[50], 0, 255, 0, width - 50);
  y = map(spectrum[100], 0, 255, 0, height - 50);

// Draw the frog
  tint(r, g, b);
  image(img, x, y, 50, 50);

// Draw particles
  for (var i = 0; i < particles.length; i++) {
    particles[i].update(spectrum);
    particles[i].display(spectrum);
  }
}

// Using the mouse to execute movement
// creating a conditional, isPlaying work in way that returns the boolean
// boolean() converts values to true or false
function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}

// Creando constructor y definiendo particulas
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(2, 5);
  }

  update(spectrum) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
    this.size = map(spectrum[floor(random(spectrum.length))], 0, 255, 2, 5);
  }

// How I will show the particles using the spectrum
  display(spectrum) {
    fill(map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255));
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}