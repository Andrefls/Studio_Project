### website link:  https://andrefls.github.io/Studio_Project/
## Studio_Project

# Art perception depends on how you feel

## SYNOPSIS

- It is always hard to decide what path to take. Creativity is not something that quickly appears when you need it. For creativity to occur and develop, everything needs to align with yourself. Especially talking about emotions and thoughts.
  
- I have explored many ideas during these 10 workshops, but the one that drives me is giving people (the observer) the right to transform an idea that has been drawn.
  
- Therefore, I will express my enthusiasm for developing an idea that will include interactivity based on data.
  
- The idea is to be able to retrieve human feelings (emotions), including reaction data, and use it to modify my paintings.
  
- This work is based on a painting from the artist and implements Javascript, HTML, and CSS language to modify this painting by inputting data (heart rate values) that the observer types.
  
- The artwork is an engaging audio-visual result that shows image transformation by sound data and input value.

- So, at the end of this work, I hope It will not only be my feelings being expressed with ink on paper but also society's emotions transforming my feelings (paintings) to reflect what they feel.

## Summary/Problem-solving

- Emotions. How can I get emotions out of people to use that data in my drawings?
  
- After a long thought, I said emotions are attached to the heart; for example, when you get scared, your heartbeat changes and becomes fast. This simple example made me realise that the path to follow was the emotions attached to the heart; depending on how fast or slow the heart rate of a life species, the mood will be reflected.
  
- So I went and asked Google to get some information that clarified if heart rate can change by emotions. I found this research, where they explain that the changes are not abrupt but exist. More [research](https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2019.01131/full) has been done on this topic, which has ratified that it could be possible. My primary purpose of this work is not proof that it is possible; my purpose, to clarify, is to catch that data from the heart after emotions have been felt and reproduce it in a visual work. So, explaining that both are possible, I will move to the next step.

- So, heart rate changes with emotions, but how Can I retrieve this data? How could I get those values on the code? I have experience retrieving data from an API before, and this could be the answer. So I went and asked Google for an API where I could retrieve this kind of data and found one.

- This [API](https://rapidapi.com/checkup-checkup-default/api/checkup-api) provided me with the idea of retrieving the data. However, it was not a free API, so I showed it to our Lecturer, but He said It would not work for the project as it was not free.

- An API was not the answer, but this would not frustrate my idea. I started thinking about what I should do to retrieve heart data from people.

- I know technology and old-fashioned ways to measure heart rate, like a finger in your neck and count, as well as smartwatches and phones.

- Here, I had to make a hard decision: I could keep looking for a free API to retrieve data (the timeframe in this project is tight), or I could use [interactivity](https://www.wordreference.com/definition/interactive) as a solution and make people input the data for me.

- Now that I have defined how to retrieve the data, I will use our lecture class and workshop examples to create an input box to allow the observer to input the heart rate values. This will be applied when the code is at a stage where it needs it. It is too early to know how exactly I will do it, but this will go there.

- Now, I have the values, but what could I do with those values? How could I complement the idea of that input data? How could I make people believe their typing is showing or reflecting on this work?

- I have previously studied visual arts, which solved this problem. I will simulate the heartbeat rate value by introducing sound to the code, making people hear the heartbeats and convincing them that the simulation could be their heart. This will also bring new reactions, which will be fascinating if I can constantly retrieve them and explore the changes. Can I accelerate or slow down the human heartbeat to the point of fainting? Who knows.

- This is where my idea became a bit clear, so from here, I needed to find the functions, variables, languages and codes that would allow me to represent that idea.

- Here, I have input values and sounds (imaginary), so what could I do with them?

- I want movement, I like colours, and I want everyone to work together.

- So, To be able to move having only a heart rate value could be plain; however, if I also have values from the sound of those heart rate values, I could have more movement, and I could even use the example from class to retrieve pixel information and modifying it by those sound values.

- I needed to confirm this was possible to archive, so I went to the p5JS web page to look for examples and found one. That example is how I started my work. Thanks to the [creator](https://editor.p5js.org/danasperry/sketches/9jtlhJLNb) of that example.

```var song;
var vol;
var amp;

var img;

var r = 235;
var g = 64;

function preload() {
  song = loadSound('cockatoo.mp3');
  img = loadImage('frog.png');
}

function setup() {
  createCanvas(600, 600);
  song.loop();
  amp = new p5.Amplitude();
}

function draw() {
  background(220);
  vol = amp.getLevel();
  
  r = map(vol, 0, 0.15, 235, 150);
  g = map(vol, 0, 0.15,64, 234);
  //target color 1 = 235, 64, 52
  //target color 2 = 150, 234, 52
  fill(r,g,52);
  strokeWeight(6);
  ellipse(width/2,height/2,300);
  image(img, width/2-50, (height-100)-(vol*3000), 100, 50); 
}```
````

- After reading the example, I realised that the code was not archiving what I wanted but was a clear example of what I needed. However, I did many things that appear in that short code, so to start using it as my base, I needed to understand the code.

- Let's take a look at a few CONCEPTS.

- [p5.Amplitude](https://p5js.org/reference/p5.sound/p5.Amplitude/): Get the current volume of a sound

- [p5.FFT](https://p5js.org/reference/p5.sound/p5.FFT/) Analyze the frequency spectrum and waveform of sounds.

- [getLevel()](https://p5js.org/reference/p5.Amplitude/getLevel/) Get the current amplitude value of a sound and, in Return action, a number that is the Amplitude level (volume) of a sound.

- [play()](https://p5js.org/reference/p5.SoundFile/play/) Start the sound file.

- [boolean()](https://p5js.org/reference/p5/boolean/) converts values to true or false.

- Luckily enough, these concepts are not too strange for me as I do remember seeing all these concepts in my sound class while I was studying visual arts; the thing was, I did not know I could use them here and how to use them here, but this example shows it perfectly, and the trials I am going to experiment will allow me to learn it.

- To clarify, some tweaks were necessary; I downloaded a random frog image from Google and a random song from my library and attached it to it.

- My first step was to make the code work for me. I altered a few things and developed what I thought was the beginning.

```// WORKING FROG MOVING
// setting up variables
var song;
var vol;
var amp;
var fft;
var img;
var r = 235;
var g = 64;

// developing preload function 
function preload (){
song = loadSound ('sound/cockatoo.mp3');
img = loadImage ('images/frog.png');
background (255,0,0);}

// developing setup function
function setup() {
createCanvas(600, 600);

// setting definitions to retrieve data
amp = new p5.Amplitude ();
fft = new p5.FFT ();

// Loop and playing the song 
song.play ();
song.loop ();}

// developing drawing function
function draw() {
background(220);

// Drawing the values I have retrieved from sound
vol = amp.getLevel ();
var spectrum = fft.analyze ();

//This is how I map the frequency spectrum to Colour Values
r = map (spectrum [20],0,255,64,234);
g = map (spectrum [50], 0, 255, 64, 234);
tint (r,g, 52);
image (img, width/2-50, (height-100)-(vol*100), 100, 50);}

// Using the mouse to execute movement
function mousePressed (){

// creating a conditional, isPlaying work in a way that returns the boolean
if (song.isPlaying()){
song.stop();
background (255,0,0);} 
else {
song.play ();
background (0,255,0);}
}```
````

- FROG IMAGE - EXAMPLE SCREENSHOT

- At this stage, I had the frog moving up and down by the sound. However, I do not know precisely what makes the frog move. I need to be able to alter those values. So, I needed to represent the frequencies.

- I looked for an example in p5JS, and [these]([url](https://editor.p5js.org/p5/sketches/Sound:_FFT_Spectrum)) [two]([url](https://editor.p5js.org/josephinewang/sketches/88DJKE2jQ)) examples allowed me to add it to my code sketch and visualise the frequency representation.

- In this case, the representation uses microphone audio, but it has the same end as mine, so I added this to my coding and modified some things.

- EXAMPLE 1
```let mic, fft;
function setup() {
createCanvas(710, 400);
noFill();

mic = new p5.AudioIn();
mic.start();
fft = new p5.FFT();
fft.setInput(mic);}

function draw() {
background(200);
let spectrum = fft.analyze();
beginShape();
for (i = 0; i < spectrum.length; i++) {
vertex(i, map(spectrum[i], 0, 255, height, 0));}
endShape();}```
````

- Example 2
- The exact code I use where map example is shown

```let spectrum = fft.analyze();
//draw the spectrum visualizer
noStroke();
for (let i = 0; i < spectrum.length/2; i++){
let x = map(i, 0, spectrum.length/2, 0, width);
let h = -height + map(spectrum[i], 0, 255, height, 0);

let c = 0;  //hue
let sat = 0; //sat
let bri = 0; //bri
let l; //light#
    
for(let n = 0; n < note_freq.length; n++){
for (let mul = 1/8; mul < 64; mul *= 2){
        
//find bin number from note freq
if(note_freq[n] * mul >= bin_freq[i] && note_freq[n] * mul < bin_freq[i+1]){
c = map(n, 0, note_freq.length, 0, 360);
sat = 100;
bri = 100;}```
````

- In the second example, I use the representation of brightness, saturation and hue to replace it with RGB values.

- But to be able to understand it and apply it, I have to read two new concepts.

- [Analyze](https://p5js.org/reference/p5.FFT/analyze/) : Returns the frequency spectrum of the input signal.

- [Spectrum]([url](https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07)): In p5.js, a spectrum can refer to a visualisation of audio data, such as a spectrogram or an irisgram. p5.js is a JavaScript library that allows users to create interactive visuals through web browsing.

- [map()](https://p5js.org/reference/p5/map/) Re-maps a number from one range to another

- After reading, I could follow an example in the link attached to create this visual effect, which I did. All the extracts on the following code were taken from this page and added to my code.

- I did my code, but it was missing a few touches, so I also asked Meta for an example so I could combine it all. In fact, from now on, I will investigate, analyse, try to do it, and then ask Meta to help me with concepts. Its codes are complex and sometimes incorrect, but if you ask for ideas or examples, you can understand and follow them and improve yours.

- PICTURE 1, 2, 3, 4

- The result of reading, understanding, and seeing examples gave me the following: at this point, I have a good starting point for my visual goal. From now on, I start adding and tweak the class samples I did in my workshops to modify that frequency representation to what I want. Particles will represent light in the scenery and modify by frequencies.

- TRYING TO DRAW AMPLITUDE AND FREQUENCY

```var song;
var vol;
var amp;
var fft;
var img;
var r = 235;
var g = 64;

function preload() {
song = loadSound('sound/cockatoo.mp3');
img = loadImage('images/frog.png');}

function setup() {
createCanvas(600, 600);

// setting definitions to retrieve data
amp = new p5.Amplitude();
fft = new p5.FFT();

// Loop and playing the song 
song.play();
song.loop();}

function draw() {
background(220);

// Drawing the values I have retrieved from sound
vol = amp.getLevel();
var spectrum = fft.analyze();

// Drawing amplitude
fill(255, 0, 0);
noStroke();
rect(10, 10, vol * 100, 20);

// Drawing frequency
// Creating an spectrum array that loop

fill(0, 0, 255);
noStroke();

//The map() function converts a value from one range to another.
for (var i = 0; i < spectrum.length; i++) {
var x = map(i, 0, spectrum.length, 0, width);
var h = map(spectrum[i], 0, 255, 0, height);
rect(x, height - h, 2, h);}

//This is how I map the frequency spectrum to Colour Values
r = map(spectrum[20], 0, 255, 235, 150);
g = map(spectrum[50], 0, 255, 64, 234);
tint(r, g, 52);
image(img, width/2-50, (height-100)-(vol*100), 100, 50);}

// Using the mouse to execute movement

function mousePressed() {

// creating a conditional, isPlaying work in a way that returns the boolean
// boolean() converts values to true or false
if (song.isPlaying()) {
song.stop();
background(255, 0, 0);} 
else {
song.play();
background(0, 255, 0);}
}```
````

- IMAGE FROG WITH FREQUENCIES

- Now, I have the frequencies on the screen and the frog moving, but this is not my artistic idea. I need those ideas to merge.

- I need the frog to be able to move with the frequency because, in the end, I want to replace those frequencies for heart rate sounds, which will alter that movement. How do I do it?

- I know I need to modify X and Y using frequencies, so I went to see an example I saw previously to check if it was possible. The example was straightforward. So, I applied it to my code.

- [Example 3](https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07)

```function draw() {
background(0);
let spectrum = fft.analyze();
console.log(spectrum);
for (let i = 0; i < spectrum.length; i++) {
stroke(255);
let amp = spectrum[I];
let y = map(amp, 0, 256, height, 0);
line(i, height, i, y);}}```
````

- Result: MOVING USING FREQUENCY

```var song;
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
img = loadImage('images/frog.png');}

function setup() {
createCanvas(600, 600);

// setting up definitions to retrieve data
amp = new p5.Amplitude();
fft = new p5.FFT();

//Loop and play
song.play();
song.loop();

// setting up movement
x = random(width);
y = random(height);}

function draw() {
background(220);

// Drawing the values I have retrieved from sound
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
Rect(i * 2, height - h, 2, h);}

//This is how I map the frequency spectrum to Colour Values
r = map(spectrum[20], 0, 255, 235, 150);
g = map(spectrum[50], 0, 255, 64, 234);
b = map(spectrum[80], 0, 255, 80, 234);

// This is how I move the frog using frequency
x = map(spectrum[50], 0, 255, 0, width - 50);
y = map(spectrum[100], 0, 255, 0, height - 50);

// Drawing the frog
tint(r, g, b);
image(img, x, y, 50, 50);}

// Using the mouse to execute movement
// creating a conditional, isPlaying work in a way that returns the boolean
// boolean() converts values to true or false
function mousePressed() {
if (song.isPlaying()) {
song.stop();
background(255, 0, 0);} 
else {
song.play();
background(0, 255, 0);}
}```
````

- IMAGE FROG MOVING BUT TINT

- Here, I noticed that the frequency only changed the RGB values, affecting the tint, but it was not what I wanted. I want the image transform to modify its pixels, so I looked for one of the samples I have done previously to achieve this.
 
- I went to Workshop 3 and copied the code related to index colour to extract pixel references and build an array that would also work with the particles.

```for (let y = 0; y < img2.height; y++){
for (let x = 0; x < img2.width; x++){
let index = (x + y * img2.width)*4;
img2.pixels [index+0] = random (25) // red value
img2.pixels [index+1] = random (40) // green value
img2.pixels [index+2] = random (230) // blue value
let mX = x + random (-1, 1);
let mY = y + random (-2,2);
mX= constrain (mX, 0, img2.width);
mY= constrain (mY, 0, img2.height);
let newIndex = (mX + mY * img2.width) * 4;
img2.pixels [newIndex] = img2.pixels [index];
img2.pixels [newIndex + 1] = img2.pixels [index+1];
img2.pixels [newIndex + 2] = img2.pixels [index +2];```
````

- To clarify, this previous workshop3 did have the help of META in some places, so this code is part of an earlier help from the AI technology.

- I also added a Constructor Class example from one of our class examples. This clearly will use the frequency and the index colour of pixels and represent them in particles (geometric shape ellipse).

- I did everything possible, but the ellipses were not moving or changing. Here, it was frustrating. I thought I was missing something. I saw an example on this page that showed that I was missing updating the particles, but to be honest, I followed. I modified my code, but it still did not work; maybe at this stage, my brain was putting too many challenges, and It got shut, so I asked Meta to give me an example to clarify everything I read, but based on my code.

- [Example 4](https://editor.p5js.org/Playful-Coding/sketches/XbeqeA_XT)

```class Particle{
constructor(position,scale,speed,color){
this.position = position;
this.scale = random(0, 1);
this.speed = createVector(0, random(0, 10) );
this.color = [random(0, 255), random(0,255), random(0,255), random(0,255)];}

//Use FFT bin level to change speed and diameter
update(someLevel){
this.position.y += this.speed.y / (someLevel*2);
if (this.position.y > height) {this.position.y = 0;}
this.diameter = map(someLevel, 0, 1, 0, 200) * this.scale;}```
````

- META EXAMPLE 2 IMAGES
  
- Result: Moving Particles by Frequency

```var song;
var vol;
var amp;
var fft;
var img;
var particles = [];

function preload() {
song = loadSound('climbing.mp3');
img = loadImage('painting/singer.png');}

function setup() {
createCanvas(1500, 1000);
amp = new p5.Amplitude();
fft = new p5.FFT();
song.play();
song.loop();
for (var i = 0; i < 500; i++) {
particles.push(new Particle());}}

function draw() {
background(0);
vol = amp.getLevel();
var spectrum = fft.analyze();
  
// Draw amplitude
fill(255, 0, 0);
noStroke();
rect(10, 10, vol * 100, 20);

// Draw the frog
img.loadPixels();
for (var i = 0; i < img.pixels.length; i += 4) {
var rIndex = i;
var gIndex = i + 1;
var bIndex = i + 2;
var aIndex = i + 3;
var freqIndex = floor(map(i, 0, img.pixels.length, 0, spectrum.length));
img.pixels[rIndex] = map(spectrum[freqIndex % spectrum.length], 0, 255, 0, 255);
img.pixels[gIndex] = map(spectrum[(freqIndex + 10) % spectrum.length], 0, 255, 0, 255);
img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);}
img.updatePixels();
  
// Draw particles
for (var i = 0; i < particles.length; i++) {
particles[i].update(spectrum);
particles[I].display(spectrum);}

// Draw the image with scaling
imageMode(CENTER);
push();
var offsetX = map(vol, 0, 1, -100, 100);
image(img, width / 2 + offsetX, height / 2, img.width, img.height);
pop();}

function mousePressed() {
if (song.isPlaying()) {
song.stop();
background(255, 0, 0);} 
else {
song.play();
background(0, 255, 0);}}

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
display(spectrum) {
fill(map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255));
noStroke();
ellipse(this.x, this.y, this.size);}}```
````

- What did I learn? Most concepts were evident at this stage, except I was missing a few things.

- I needed to learn that to make the particles move, I needed them to change the position, create a variable, an array that will store the previous position and update it to a new one based on the frequency values.

- I also learned that I must do this at a particular speed value and that vx and vy mean velocity on those coordinates.

- I also included a function trying to scale the frog, but it did not work well.

- I also include random movement of particles as I want them to represent light.

- Here, I have the frog moving; I will need to tidy up the movement, like constraining it to only the X-axis or choosing between a random movement or A to B. However, the movement is working. I do not need to worry now; I will replace the images, and they will tell me if I need to do that.

- Now, I have talked about interactivity, but I haven't applied it yet. Well, I have everything starting depending on a mouse-pressed function, but as I mentioned before, I want a way for people to input the data. How do I do that?

- Well, it's not too difficult; I only need to apply one of the examples from class and my workshops, where we create a submit button and an input data box.

- So, I used my [workshop6]([url](https://github.com/Andrefls/Workshop-task-6/blob/main/sketch.js)) to extract the input box and button code.

- However, a problem arises here. If I put an input box and tell people to put heart rate data, they could use a decimal number or a word that can't be converted into an integer. I want to ensure this data is an integer (exact number); if not, convert it into it. I went to ask Google to help me find a p5js function to convert decimals to integers.

- I found this [site](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), read through it, and understood a bit. First, it was clear that I was right; I need my code to be able to work and not crash, so I do need this to work out. I learnt a few concepts here.

- Let's take a look at those concepts:

- [Int()](https://p5js.org/reference/p5/int/)  Converts a Boolean, String, or decimal Number to an integer.

- [String](https://p5js.org/reference/p5/String/): A sequence of text characters. The String data type helps work with text.

- [parseInt function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt): converts its first argument to a string, parses that string, and then returns an integer or NaN.

- [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), the return value will be the integer that is the first argument taken as a number in the specified radix. I understood here that if it is also not an integer, it could create a conditional to return a number.

- [Radix](https://www.w3schools.com/jsref_parseint.asp#:~:text=): In the context of p5.js, "radix" refers to the base of a number system used when parsing a string into a numerical value

- META IMAGES EXAMPLE 3

- After a few hours of frustration, I got to combine the concepts and examples, and finally, I got a code.

- The Result: A code with interactivity, retrieving data and acting on it.

- This code is also using offset to move the image by sound values. (Trial)


```
// ADDING INTERACTIVE BUTTON (NOT WORKING FULLY BUT GOOD ENOUGH FOR NOW)
// CREATING NEW VARIABLES AS I AM DOING START WITH THE SUBMIT BUTTON
// CREATING INPUX BOX AND ADDING TEXT

let song;
let vol;
let amp;
let fft;
let img;
let particles = [];
let started = false;
let heartRate = 1; 
let inputBox;
let submitButton;

function preload() {
song = loadSound('sound/climbing.mp3');
img = loadImage('images/frog.png');}

function setup() {
createCanvas(1500, 1000);
  
// setting up definitions to retrieve data
amp = new p5.Amplitude();
fft = new p5.FFT();
  
//Setup up an array of particles here to be able to use it later
for (var i = 0; i < 500; i++) {
particles.push(new Particle());}
  
// Setting input box as class example
inputBox = createInput('');
inputBox.position(650, 1010);
inputBox.size(100, 30);
  
//Setting up the submit button as per the class example

submitButton = createButton('Submit');
submitButton.position(760, 1012);
submitButton.size(100, 30);
  
 // Submit Button
 // Creating statement
 // Using something new called parseInt, which retrieves values and converts them to integers (numbers)
 // Using something new, called isNaN, to check if the value is not a number converted to value 1.
 // Also, an Array for the particles to move randomly
 // Expecting to work after the submit button
 // Set velocity on the particles for the movement (vx,vy)
 
submitButton.mousePressed(() => {
heartRate = parseInt(inputBox.value());
if (isNaN(heartRate)) {
heartRate = 1;}
if (started) {song.stop();}
started = true;
song.play();
song.loop();
for (var i = 0; i < particles.length; i++) {
particles[i].x = random(width);
particles[i].y = random(height);
particles[i].vx = random(-2, 2);
particles[i].vy = random(-2, 2);
particles[i].size = random(2, 5);}});}

function draw() {
background(0);
// Drawing the values I have retrieved from sound
//Including conditionals
if (started) {
vol = amp.getLevel();
var spectrum = fft.analyze();

 // Drawing amplitude
 fill(255, 0, 0);
 noStroke();
 rect(10, 10, vol * 100, 20);
    
 // Drawing frequency
 // Creating an spectrum array that loop
 img.loadPixels();
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
img.pixels[bIndex] = map(spectrum[(freqIndex + 20) % spectrum.length], 0, 255, 0, 255);}
img.updatePixels();
      
// Draw particles and array loop (Using spectrum)
for (var i = 0; i < particles.length; i++) {
particles[i].update(spectrum);
particles[i].display(spectrum, heartRate);}
    
// Draw the image and offset it on X to create a movement effect
// Using Vol frequency for movement
// I think I am becoming crazy
// Adding indication text

imageMode(CENTER);
push();
var offsetX = map(vol, 0, 1, -100, 100);
image(img, width / 2 + offsetX, height / 2, img.width, img.height);
pop();} 
else {
fill(255);
textSize(32);
text("Please type your heart rate value and click submit", width / 2 - 300, height / 2);}}

// Creating constructor and defining particles
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
if (this.y < 0 || this.y > height) {this.vy *= -1;}
this.size = map(spectrum[floor(random(spectrum.length))], 0, 255, 2, 5);}

// How I will show the particles using the spectrum
display(spectrum, heartRate) {
fill(map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255), map(random(spectrum.length), 0, 255, 0, 255));
noStroke();
ellipse(this.x, this.y, this.size * heartRate / 4);}}```
````















## Future development

- In the future, that will be retrieved using technology, such as heart rate retrieval devices that connect to the code and act on the drawing.

## Conclusion

NO YET



