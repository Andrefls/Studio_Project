// WARNING MESSAGE (WORKING)
// TEXT NO WORKING AS I WANT (Will modified)
// ADDING ALL IMAGES
// MAKING ONE OF THE IMAGES ROTATE (no fully ready)

let song1, song2, song3, song4, song5;
let vol;
let amp;
let fft;
let img, img1, img2, img3, img4, img5;
let particles = [];
let started = false;
let heartRate = 1;
let inputBox;
let submitButton;
let currentSong;
let showEmergencyMessage = false;
let emergencyTimeout = null;
let angle = 0;

// Loading new images (The house is shaking_would it work)
function preload() {
song1 = loadSound('sound/climbing.mp3');
song2 = loadSound('sound/heartsound2.mp3');
song3 = loadSound('sound/heartsound3.mp3');
song4 = loadSound('sound/heartsound4.mp3');
song5 = loadSound('sound/heartsound5.mp3');
img = loadImage('images/singer.png');
img1 = loadImage('images/monster.png');
img2 = loadImage('images/rightm.png');
img3 = loadImage('images/leftm.png');
img4 = loadImage('images/musicnotes.png');
img5 = loadImage('images/floor.png');
}

function setup() {
createCanvas(1500, 1000);
// Retrieving data
amp = new p5.Amplitude();
fft = new p5.FFT();
// Particles Array
for (var i = 0; i < 500; i++) {
particles.push(new Particle());
}
// Input box
inputBox = createInput('');
inputBox.position(650, 1010);
inputBox.size(100, 30);
//Submit button
submitButton = createButton('Submit');
submitButton.position(760, 1012);
submitButton.size(100, 30);

// Submit Button
// Statements
// Use parseInt which retrieves values and convert it to integer (number)
// Use isNaN to check if the value is not a number convert to value 1.
// Array for the particles to move randomly
// Expect loop to work after submit button
// Velocity on the particles for the movement (vx,vy)
// Conditionals depending input data
submitButton.mousePressed(() => {
heartRate = parseInt(inputBox.value());
if (isNaN(heartRate)) {
heartRate = 1;
}
if (started) {
currentSong.stop();
}
started = true;
angle = 0;
if (heartRate < 60 || heartRate > 180) {
showEmergencyMessage = true;
if (emergencyTimeout !== null) {
clearTimeout(emergencyTimeout);
 }
 emergencyTimeout = setTimeout(() => {
 window.location.reload();
 }, 2000);
 } else {
 showEmergencyMessage = false;
 if (emergencyTimeout !== null) {
 clearTimeout(emergencyTimeout);
 }
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
}
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
// Values for retrieving sound data
// New conditionals
// Modified Amplitud
if (!started) {
fill(255);
textSize(32);
text("Please type your hear rate value and click submit", width / 2 - 300, height / 2);
inputBox.show();
submitButton.show();
} else {
// Draw img4 with rotation and animation
// Draw the image and offsetting it on X, to create movement effect
// Separating functions by images movement
// Use Vol frequency for movement
// Adding indication text
// Adding index to each picture depending of the action I want
imageMode(CENTER);
push();
translate(width / 2, height / 2);
rotate(radians(angle));
var img4Size = map(amp, 0, 1, 50, 200);
image(img4, 0, 0, img4Size, img4Size);
pop();
    
// Draw other images
image(img2, width / 2, height / 2, img1.width, img1.height);
image(img3, width / 2, height / 2, img1.width, img1.height);
image(img5, width / 2, height / 2, img1.width, img1.height);
    
if (showEmergencyMessage) {
fill(255, 0, 0);
textSize(32);
text("Call Emergency", width / 2 - 150, height / 2);
angle = 0; // Reset the angle
} else {
vol = amp.getLevel();
var spectrum = fft.analyze();
fill(255, 0, 0);
noStroke();
rect(10, 10, vol * 100, 20);
img.loadPixels();
for (var i = 0; i < img.pixels.length; i += 4) {
var rIndex = i;
var gIndex = i + 1;
var bIndex = i + 2;
var aIndex = i + 3;
var freqIndex = floor(map(i, 0, img.pixels.length, 0, spectrum.length));
img.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
img.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);
}
img.updatePixels();
img1.loadPixels();
for (var i = 0; i < img1.pixels.length; i += 4) {
var rIndex = i;
var gIndex = i + 1;
var bIndex = i + 2;
var aIndex = i + 3;
var freqIndex = floor(map(i, 0, img1.pixels.length, 0, spectrum.length));
img1.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
img1.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
img1.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);
}
img1.updatePixels();
for (var i = 0; i < particles.length; i++) {
particles[i].update(spectrum);
particles[i].display(spectrum, heartRate);
}
imageMode(CENTER);
push();
var offsetX = map(vol, 0, 1, -10, 100);
var offsetX2 = map (vol, 0, 1, -100, 100);
image(img, width / 2 + offsetX, height / 2, img.width, img.height);
image(img1, width / 2 + offsetX2 + 100, height / 2, img1.width, img1.height);
pop();
angle += 2;
}
}
}

// Constructor and particles
// Imput data actioning changes (Spectrum and heart rate)
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