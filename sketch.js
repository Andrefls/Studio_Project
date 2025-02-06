var song;
var vol;
var amp;
var fft;
var img;
var r = 235;
var g = 64;

function preload (){
  song = loadSound ('sound/cockatoo.mp3');
  img = loadImage ('images/frog.png');
  background (255,0,0);
}

function setup() {
  createCanvas(600, 600);

  // setting definitions to retrieve data

  amp = new p5.Amplitude ();
  fft = new p5.FFT ();

// Loop and playing the song 

  song.play ();
  song.loop ();
}

function draw() {
  background(220);

  // Drawing the values I have retrieve from sound

  vol = amp.getLevel ();
  var spectrum = fft.analyze ();

  //This is how I map the frequency spectrum to Colour Values

  r = map (spectrum [20],0,255,64,234);
  g = map (spectrum [50], 0, 255, 64, 234);
  tint (r,g, 52);
  image (img, width/2-50, (height-100)-(vol*100), 100, 50);
}

// Using the mouse to execute movement

function mousePressed (){

  // creating a conditional, isPlaying work in way that returns the boolean

  if (song.isPlaying()){
    song.stop();
    background (255,0,0);
  } else {
    song.play ();
    background (0,255,0);
  }
}
