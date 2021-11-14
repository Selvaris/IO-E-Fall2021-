/* 
Changes the pitch, rate, and volume of a spoken phrase after mouse click
*/

let osc;
let playing = false;
let serial;
let latestData = "waiting for data";  
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;

let osc1, osc2, osc3, fft;

let voice =new p5.Speech();

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();


  serial.list();
  console.log("serial.list()   ", serial.list());


  serial.open("COM3");


  serial.on('connected', serverConnected);


  serial.on('list', gotList);
  
  serial.on('data', gotData);

  serial.on('error', gotError);
  
  serial.on('open', gotOpen);


 
}


osc1 = new p5.TriOsc(); // set frequency and type
osc1.amp(.5);
osc2 = new p5.TriOsc(); // set frequency and type
osc2.amp(.5);  
osc3 = new p5.TriOsc(); // set frequency and type
osc3.amp(.5);    

fft = new p5.FFT();
//osc1.start();
//osc2.start(); 
//osc3.start();
// Using the values from the oscillator but without the persistent sound in the background.

function serverConnected() {
  console.log("Connected to Server");
}


function gotList(thelist) {
  console.log("List of Serial Ports:");

  for (var i = 0; i < thelist.length; i++) {

    console.log(i + " " + thelist[i]);
  }
}


function gotOpen() {
  console.log("Serial Port is Open");
}


function gotError(theerror) {
  console.log(theerror);
}




function gotData() {
  var currentString = serial.readLine();  
  trim(currentString);                  
  if (!currentString) return;             
  console.log("currentString  ", currentString);            
  latestData = currentString;            
  console.log("latestData" + latestData);   
  splitter = split(latestData, ',');      
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];               
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



}


function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


function draw() {
  
  background(25,25,25);
  text(latestData, 10,10);
  ellipseMode(RADIUS);    
  fill(121, 133, 206);
  noStroke(); 
  //console.log("diameter0  "  + diameter0);
  ellipse(windowWidth / 3, windowHeight / 2, diameter0*100, diameter0*100);
  ellipseMode(RADIUS);    
  fill(143, 206,49);
  ellipse(windowWidth / 2, windowHeight /2, diameter1, diameter1);
  ellipseMode(RADIUS);
  fill(206,115, 179);
  ellipse(windowWidth / 1.5, windowHeight / 2, diameter2, diameter2);
    
  
  var freq = map(diameter0, 0, width, 40, 880);    
osc1.freq(freq);
   
 //  console.log(freq);
    
 var freq2 = map(diameter1, 0, width, 40, 880);    
  osc2.freq(freq2);
    console.log(freq2);
    
 var freq3 = map(diameter2*10, 0, width, 40, 880);    
   osc3.freq(freq3);
// console.log(freq3); 


  
}

function mousePressed(){
  voice.speak('Hello guys it is I, Don Cheadle from the Don Cheadle show');
  voice.setVolume(diameter0+ 1);
//since the button would need to be held down constantly to be audible and the values only range from 0 to 1, I decided to add 1 to make the speech louder but not silent
voice.setRate(diameter1 / 511.5);
//because the max value is 1023 and pitch ranges from 0 to 2
voice.setPitch(diameter2 / 36);
//because the max value is 72
}


function mouseClicked(){
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("getAudioContext().state" + getAudioContext().state);
  }
};

 