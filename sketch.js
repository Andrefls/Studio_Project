// TRYING TO MOVE FROG RANDOMLY
var song;
var vol;
var amp;
var fft;
var img;

// Setting up new variables 

var r = 0;
var g = 50;
var b = 100;
var x = 0;
var y = 0;

function preload() {
  song = loadSound('sound/cockatoo.mp3');
  img = loadImage('images/frog.png');
}

function setup() {
  createCanvas(600, 600);

  // setting definitions to retrieve data

  amp = new p5.Amplitude();
  fft = new p5.FFT();

  // Loop and playing the song


  song.play();
  song.loop();

  // Setting up the movement

  x = random(width);
  y = random(height);
}

function draw() {
  background(220);

 // Drawing the values I have retrieve from sound

  vol = amp.getLevel();
  var spectrum = fft.analyze();

  // Drawing amplitude
  fill(255, 0, 0);
  noStroke();
  rect(10, 10, vol * 100, 20);

  // Drawing frequency
  // Creating an spectrum array that loop

  fill(0, 10, 255);
  noStroke();

  //The map() function converts a value from one range to another.

  for (var i = 0; i < spectrum.length; i++) {
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(i * 2, height - h, 2, h);
  }

  //This is how I map the frequency spectrum to Colour Values

  r = map(spectrum[20], 0, 255, 235, 150);
  g = map(spectrum[50], 0, 255, 64, 234);
  b = map(spectrum[80], 0, 255, 80, 234);

  // This is how I move the frog randomly
  x += map(vol, 0, 1, -5, 5);
  y += map(spectrum[50], 0, 255, -5, 5);

  // Keeping the frog within the canvas
  x = constrain(x, 0, width - 50);
  y = constrain(y, 0, height - 50);

  // Drawing the frog
  tint(r, g, b);
  image(img, x, y, 50, 50);
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