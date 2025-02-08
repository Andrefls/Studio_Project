//REPLICATING AS I AM ADDING 5 NEW SOUND
//Creating Variables
// Creating conditionals

let song1, song2, song3, song4, song5;
let vol;
let amp;
let fft;
let img;
let particles = [];
let started = false;
let heartRate = 1;
let inputBox;
let submitButton;
let currentSong;

function preload() {
song1 = loadSound('sound/climbing.mp3');
song2 = loadSound('sound/heartsound2.mp3');
song3 = loadSound('sound/heartsound3.mp3');
song4 = loadSound('sound/heartsound4.mp3');
song5 = loadSound('sound/heartsound5.mp3');
img = loadImage('images/frog.png');
}

function setup() {
createCanvas(1500, 1000);
//setting up definitions to retrieve data
amp = new p5.Amplitude();
fft = new p5.FFT();
//Setup up an array of particles here to be able to use it later
for (var i = 0; i < 500; i++) {
particles.push(new Particle());
}
// Setting input box as class example
inputBox = createInput('');
inputBox.position(650, 1010);
inputBox.size(100, 30);
// Setting up submit button as per class example
submitButton = createButton('Submit');
submitButton.position(760, 1012);
submitButton.size(100, 30);

// Submit Button
// created statement
// Use parseInt which retrieves values and convert it to integer (number)
// Use isNaN to check if the value is not a number convert to value 1.
// Also an Array for the particles to move randomly
// Expect loop to work after submit button
// Set velocity on the particles for the movement (vx,vy)
// added conditionals depending input data

submitButton.mousePressed(() => {
heartRate = parseInt(inputBox.value());
if (isNaN(heartRate)) {
heartRate = 1;
}
if (started) {
currentSong.stop();
}
started = true;
if (heartRate >= 60 && heartRate < 75) {
currentSong = song1;
} else if (heartRate >= 75 && heartRate < 90) {
currentSong = song2;
} else if (heartRate >= 90 && heartRate < 105) {
currentSong = song3;
} else if (heartRate >= 105 && heartRate < 120) {
currentSong = song4;
} else if (heartRate >= 120 && heartRate < 135) {
currentSong = song5;
}
currentSong.play();
currentSong.loop();
for (var i = 0; i < particles.length; i++) {
particles[i].x = random(width);
particles[i].y = random(height);
particles[i].vx = random(-2, 2);
particles[i].vy = random(-2, 2);
particles[i].size = random(2, 5);
}
});
}

function draw() {
background(0);
// Drawing the values I have retrieve from sound
// Including conditionals
if (started) {
vol = amp.getLevel();
var spectrum = fft.analyze();
// Drawing amplitude
fill(255, 0, 0);
noStroke();
rect(10, 10, vol * 100, 20);
img.loadPixels();
 
// Drawing frequency
// Creating an spectrum array that loop
for (var i = 0; i < img.pixels.length; i += 4) {
var rIndex = i;
var gIndex = i + 1;
var bIndex = i + 2;
var aIndex = i + 3;
//The map() function converts a value from one range to another.
var freqIndex = floor(map(i, 0, img.pixels.length, 0, spectrum.length));
//This is how I map the frequency spectrum to Colour Values
img.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
img.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);
}
img.updatePixels();
// Draw particles and array loop (Using spectrum)
for (var i = 0; i < particles.length; i++) {
particles[i].update(spectrum);
particles[i].display(spectrum, heartRate);
}
// Draw the image and offsetting it on X, to create movement effect
// Use Vol frequency for movement
// I think I am becoming crazy
// Adding indication text
imageMode(CENTER);
push();
var offsetX = map(vol, 0, 1, -100, 100);
image(img, width / 2 + offsetX, height / 2, img.width, img.height);
pop();
} else {
fill(255);
textSize(32);
text("Please type your hear rate value and click submit", width / 2 - 300, height / 2);
}
}
// Creating constructor and defining particles
// Using imput data (Spectrum and heart rate)
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
  
display(spectrum, heartRate) {
fill(map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255));
noStroke();
ellipse(this.x, this.y, this.size * heartRate /5);
}
}