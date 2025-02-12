website link:  https://andrefls.github.io/Studio_Project/

# Studio_Project
Art perception depends on how you feel

## SYNOPSIS

- It is always hard to decide what path to take.
Creativity is not something that quickly appears when you need it. For creativity to occur and develop, everything needs to align with yourself. Especially talking about emotions and thoughts.
- I have explored many ideas during these 10 workshops, but the one that drives me is giving people (the observer) the right to transform an idea that has been drawn.
- Therefore, I will express my enthusiasm for developing an idea that will include interactivity based on data.
- So far, this topic has developed an intriguing feeling that has brought my childhood art to a place where I could do something with it.
- Since I was a kid, I have wanted my pen drawings to come alive; I have tried to animate, colour, and transform them, but I am still not happy with those ideas.
- I joined this class because I got intrigued by creating art with a computer; I did not know anything related to coding. I was stubborn on the idea that my brain did not like those languages. However, I took the initiative this time.
- So far, I have been enjoying the frustration of learning how to code.
- On that path, I realised that complicated things may become more manageable; for example, I realised that I could have the chance to allow people to change my drawings as they wish. At that is somethings different. If I can provide their feelings, including reactions, to modify my paintings, I will finally create ART. It will not be only my feelings being expressed with ink on paper; society's emotions will transform my feelings to reflect what they feel. 

## Summary/Problem-solving

-  I wanted to sketch some ideas, but I had better give a resume of what I wanted to do.
-  So, Emotions. How can I get emotions out of people to use that data in my drawings?
-  After a long thought, I said emotions are attached to heart; for example, when you get scared, your heartbeat changes and becomes fast. So, I could retrieve heart data and apply it to my drawings, like API, as per class. So I went to start a reseach, some pages, and I found an API. (link below)

-  https://rapidapi.com/checkup-checkup-default/api/checkup-api

-  I read through it, and it could be easy, like the sample from our lecture. LOL No, it was not. I shared my idea with our lecturer, and He said this could be a problem for our project as it was not completed for free. So, I said ok. Let's change the idea.
-  As I mentioned before, I am stubborn. I started thinking about what I should do to retrieve heart data from people. Technology and old-fashioned ways to measure heart rate, like a finger in your neck and count, or smart watches or phones. So I said, well, I dont need to retrieve data from API; I can use interactivity and make people input the data for me. (of course, when I know better and develop a more extended project, I would like to include live data, like one of those fancy heart rate machines, and be able to use all data).
-  But for now, we are going to concentrate only on the value. It sounds fun but boring, so what about if the input value goes together with the sound?.
-  So I realised I need to get heart frequency, but I had not fancy machines. However, I did visual arts (sound editing), so I said, let's record the heart and get the frequency out of the sound. LOL (my imaginary skills) So, I went online to look for an example of how to get frequency data, and I found this example.

-  https://editor.p5js.org/danasperry/sketches/9jtlhJLNb

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

- and that example is how I started developing my idea. I started replacing understanding concept of all the things they used. Then, replacing the song with things I like makes it a pleasure to work with. Then, I started playing with moves, colours, and more. Until now, I have been playing with codes as my code has developed into a bigger one, but I will share it with you when I get more precise ideas.

-  

## Future development

- The next step is adding my images, making them move by the song, and changing some things like pixels and colours. I will mainly use all my examples from class workshops.
- Also, at the end, I will be replacing the music for heartbeats.
- Then, I will add interactivity as an input box and make something with that data, like selecting the proper heart beat sound.
- At the end, I hope people see at least some movement, I will be happy if, at the end of the project, my painting moves or changes colour to the input value of people observing it. 

## Conclusion

NO YET



