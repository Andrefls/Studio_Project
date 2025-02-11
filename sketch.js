// SUMMARY (HAPPY_THIS IS WORKING)
// Need some tweeks
// Need to add more sounds as frequency can go to 180
// need photoshop images as desired
// need sound mix as desired

// Variables are established
let song1, song2, song3, song4, song5, song6, song7, song8;
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
let showText = true;

//Preload function is established
function preload() {
song1 = loadSound('sound/heartsound1.mp3');
song2 = loadSound('sound/heartsound2.mp3');
song3 = loadSound('sound/heartsound3.mp3');
song4 = loadSound('sound/heartsound4.mp3');
song5 = loadSound('sound/heartsound5.mp3');
song6 = loadSound('sound/heartsound6.mp3');
song7 = loadSound('sound/heartsound7.mp3');
song8 = loadSound('sound/heartsound8.mp3');
img = loadImage('images/singer2.png');
img1 = loadImage('images/monster2.png');
img2 = loadImage('images/rightm.png');
img3 = loadImage('images/leftm.png');
img4 = loadImage('images/musicnotes.png');
img5 = loadImage('images/floor2.png');
}

//function setup is established
function setup() {
createCanvas(1500, 1000);

// Particles array and data retrieval established
amp = new p5.Amplitude();
fft = new p5.FFT();
for (var i = 0; i < 500; i++) {
particles.push(new Particle());}

//Input box established
inputBox = createInput('');
inputBox.position(650, 1050);
inputBox.size(100, 30);

//submitButton established
submitButton = createButton('Submit');
submitButton.position(760, 1052);
submitButton.size(100, 30);

// mousepressed established
// condtional of time, setTimeout, image to be selected, and moving particles established
// sound playing as desired
// conditional for text to dissapear established
submitButton.mousePressed(() => {
heartRate = parseInt(inputBox.value());
if (isNaN(heartRate)) {
heartRate = 1;}
if (started) {
currentSong.stop();}
started = true;
angle = 0;

if (heartRate < 60 || heartRate > 180) {
showEmergencyMessage = true;
if (emergencyTimeout !== null) {
clearTimeout(emergencyTimeout);}
emergencyTimeout = setTimeout(() => {
window.location.reload();}, 2000);}
else {showEmergencyMessage = false;
if (emergencyTimeout !== null) {
clearTimeout(emergencyTimeout);}
if (heartRate >= 60 && heartRate < 75) {
currentSong = song1;}
else if (heartRate >= 75 && heartRate < 89) {
currentSong = song2;} 
else if (heartRate >= 90 && heartRate < 104) {
currentSong = song3;}
else if (heartRate >= 105 && heartRate < 119) {
currentSong = song4;}
else if (heartRate >= 120 && heartRate < 134) {
currentSong = song5;}
else if (heartRate >= 135 && heartRate < 149) {
currentSong = song6;}
else if (heartRate >= 150 && heartRate < 164) {
currentSong = song7;}
else if (heartRate >= 165 && heartRate < 180) {
currentSong = song8;}
currentSong.play();}


for (var i = 0; i < particles.length; i++) {
particles[i].x = random(width);
particles[i].y = random(height);
particles[i].vx = random(-2, 2);
particles[i].vy = random(-2, 2);
particles[i].size = random(2, 5);}
showText = false;});
}

// Drawing function established
function draw() {


if (showText) {
fill(0);
textSize(32);
text("Please type your heart rate value and click submit", width / 2 - 300, height-100);}

// Input box and button
inputBox.show();
submitButton.show();

//Emergency message
if (showEmergencyMessage) {
fill(255, 0, 0);
textSize(32);
text("Call Emergency", width / 2 - 150, height / 2);
angle = 0;
if (currentSong) {
currentSong.stop();}
return;}

// Draw particles   
if (started) {
if (currentSong && !currentSong.isPlaying()) {
window.location.reload();} 
else {for (var i = 0; i < particles.length; i++) {
particles[i].update(fft.analyze());
particles[i].display(fft.analyze(), heartRate);}
        
// Draw img4 with rotation and animation
imageMode(CENTER);
push();
translate(width / 2, height / 2);
rotate(radians(angle));
var img4Size = map(amp, 0, 1, 50, 200);
image(img4, 0, 0, img4Size, img4Size);
pop();
        
// Draw other images
image(img5, width / 2, height / 2, img1.width, img1.height);
image(img2, width / 2, height / 2, img1.width, img1.height);
image(img3, width / 2, height / 2, img1.width, img1.height);
        
vol = amp.getLevel();
var spectrum = fft.analyze();
fill(255, 0, 0);
noStroke();
rect(10, 10, vol * 100, 20);
        
//pixels representation
img.loadPixels();
for (var i = 0; i < img.pixels.length; i += 15) {
var rIndex = i;
var gIndex = i + 1;
var bIndex = i + 2;
var aIndex = i + 3;
var freqIndex = floor(map(i, 0, img.pixels.length, 0, spectrum.length));
img.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
img.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);}
img.updatePixels();

img1.loadPixels();
for (var i = 0; i < img1.pixels.length; i += 15) {
var rIndex = i;
var gIndex = i + 1;
var bIndex = i + 2;
var aIndex = i + 3;
var freqIndex = floor(map(i, 0, img1.pixels.length, 0, spectrum.length));
img1.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
img1.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
img1.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);}
img1.updatePixels();

// Moving the two singers
imageMode(CENTER);
push();
var offsetX = map(vol, 0, 1, -10, 100);
var offsetX2 = map (vol, 0, 1, 50, 100);
image(img, width / 2 + offsetX, height / 2, img.width, img.height);
image(img1, width / 2 + offsetX2 + 100, height / 2, img1.width, img1.height);
pop();
angle += 2;}}
}

// Constructor established and working
class Particle {
constructor() {
this.x = random(width);
this.y = random(height);
this.vx = random(-2, 2);
this.vy = random(-2, 2);
this.size = random(2, 5);}
  
update(spectrum) {
this.x += this.vx;
this.y += this.vy;
if (this.x < 0 || this.x > width) {
this.vx *= -1;}
if (this.y < 0 || this.y > height) {
this.vy *= -1;}
this.size = map(spectrum[floor(random(spectrum.length))], 0, 255, 2, 5);}

// heart rate display in particles working
display(spectrum, heartRate) {
fill(map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255),
map(random(spectrum.length), 0, 255, 0, 255));
noStroke();
ellipse(this.x, this.y, this.size * heartRate /20);}
}