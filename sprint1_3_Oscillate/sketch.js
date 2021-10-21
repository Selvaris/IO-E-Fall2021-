let osc, playing, freq, amp;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sawtooth');
}

function draw() {
  background(111, 158, 188);
  //changed the type of Oscillator and limits
  freq = constrain(map(mouseX, 0, width, 100, 1000), 100, 1000);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  text('Click to Play', 20, 20);
  text('Frequency: ' + freq, 20, 40);
  text('Amp: ' + amp, 20, 60);

  if (playing) {
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

function playOscillator() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 0.5);
  playing = false;
}