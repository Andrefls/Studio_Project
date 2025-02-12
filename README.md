### website link:  https://andrefls.github.io/Studio_Project/
## Studio_Project

# Art perception depends on how you feel

## SYNOPSIS

- It is always hard to decide what path to take. Creativity is not something that quickly appears when you need it. For creativity to occur and develop, everything needs to align with yourself. Especially talking about emotions and thoughts.
  
- I have explored many ideas during these 10 workshops, but the one that drives me is giving people (the observer) the right to transform an idea that has been drawn.
  
- Therefore, I will express my enthusiasm for developing an idea that will include interactivity based on data.
  
- The idea is to be able to retrieve human feelings (emotions), including reaction data, and use it to modify my paintings.
  
- In this work, I will allow people to participate in my drawing by typing a value (Heart rate). 
  
- So, at the end of this work, I hope It will not only be my feelings being expressed with ink on paper but also society's emotions transforming my feelings (paintings) to reflect what they feel.
  
- This work is based on a painting from the artist and implements Javascript, HTML, and CSS language to modify this painting by inputting data that the observer types.
  
- The artwork is an engaging audio-visual result that shows image transformation by sound data and input value.

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

-
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

## Future development

- In the future, that will be retrieved using technology, such as heart rate retrieval devices that connect to the code and act on the drawing.

## Conclusion

NO YET



