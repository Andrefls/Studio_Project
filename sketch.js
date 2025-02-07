// MODIFICATION IMG X AXIS AND PIXEL COLOURS INSTEAD OF TINT
// CHANGED SONG

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
var z = 0;
var spectrum;

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

  // setting up particles and movement
  x = width / 2;
  y = height / 2;
  for (var i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);
  // Drawing the values I have retrieve from sound
  vol = amp.getLevel();
  spectrum = fft.analyze();

  // Drawing amplitude
  fill(255, 0, 0);
  noStroke();
  rect(10, 10, vol * 100, 20);

// Map the frequency spectrum to the color values
  r = map(spectrum[20], 0, 255, 235, 150);
  g = map(spectrum[50], 0, 255, 64, 234);
  b = map(spectrum[80], 0, 255, 80, 234);
  
  // Adding move to the frog image in Z coordinate
  z = map(spectrum[100], 0, 255, 0, 2);
  
  // Drawing the frog
  // Big change as I am retrieving pixel data and using the values from the sound to change the colour

  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // Calculate the indices of the RGBA values
    var rIndex = i;
    var gIndex = i + 1;
    var bIndex = i + 2;
    var aIndex = i + 3;

    // map the index to frequency
    var freqIndex = floor(map(i, 0, img.pixels.length, 0, spectrum.length));

    // Setting the values
    img.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
    img.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
    img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);
  }
  img.updatePixels();

// Drawing the image and trying to change scale
imageMode(CENTER);
push();
var offsetX = map(vol, 0, 1, -100, 100);
image(img, width / 2 + offsetX, height / 2, img.width, img.height);
pop();
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
