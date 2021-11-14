// Source: https://editor.p5js.org/dano/sketches/T-XASCOsa
//Source:    https://www.youtube.com/watch?v=v0CHV33wDsI
// Speech Object
let speech;

function setup() {
  noCanvas();
  speechRec = new p5.SpeechRec('en-US', gotSpeech);

  let voice =new p5.Speech();

  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);


  let output = select('#speech');


  function gotSpeech() {

    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;

      output.html(said);

    }
//changed voice rate and pitch, made it regurgitate words at the speaker
    voice.setRate(.4);
    voice.setPitch(0.02);
    voice.speak(speechRec.resultString);
      // voice.speak(speechRec.resultString + "at confidence"+ speechRec.resultConfidence);
  }
}
