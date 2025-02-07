//TYDING UP - DELETING STUFF I DO NOT NEED
//IMAGE MOVING ONLY X VALUE

// DELETING RGB VARIABLES AS NOW INDEX SPECTRUM REPLACING THEM
var song;
var vol;
var amp;
var fft;
var img;
var particles = [];

function preload() {
  song = loadSound('sound/climbing.mp3');
  img = loadImage('images/frog.png');
}

function setup() {
  createCanvas(1500, 1000);
  // setting up definitions to retrieve data
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  // loop and play 
  song.play();
  song.loop();

  // BIG CHANGE HERE, I had to Setup up an array of particles here to be able to use it as I want it. 
  // I believe once I setup my other functions this may change.

  for (var i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);
  // Drawing the values I have retrieve from sound
  vol = amp.getLevel();
  var spectrum = fft.analyze();
  // Drawing amplitude
  fill(255, 0, 0);
  noStroke();
  rect(10, 10, vol * 100, 20);
  // Drawing frequency
  // // Creating an spectrum array that loop
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    var rIndex = i;
    var gIndex = i + 1;
    var bIndex = i + 2;
    var aIndex = i + 3;
     // //The map() function converts a value from one range to another.
    var freqIndex = floor(map(i, 0, img.pixels.length, 0, spectrum.length));
     // //This is how I map the frequency spectrum to Colour Values
    img.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
    img.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
    img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);
  }
  img.updatePixels();
  // Draw particles and array loop
  for (var i = 0; i < particles.length; i++) {
    particles[i].update(spectrum);
    particles[i].display(spectrum);
  }
  // Draw the image and offsetting it on X, to create movement effect
  //Using Vol frequency for movement
  // I think I am becoming crazy
  imageMode(CENTER);
  push();
  var offsetX = map(vol, 0, 1, -100, 100);
  image(img, width / 2 + offsetX, height / 2, img.width, img.height);
  pop();
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

// Creating constructor and defining particles
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