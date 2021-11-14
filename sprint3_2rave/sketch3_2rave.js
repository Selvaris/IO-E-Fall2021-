//Uses random function to make a rainbow skeleton on the user 
// Augmented week 7 sprint with music and speech, disabled hand and face accessories

let video;
let pose;
let img1;
let img2;
let skeleton;
let angle=0;
let history = [];
let r;
let g;
let b;
let  voice= new p5.Speech();

function setup(){
   
/////////////////////////////////
//load song
song = loadSound('images/takemeaway.mp3');
    
frameRate(30);     
createCanvas(1280, 960);
noStroke();    
video = createCapture(VIDEO);
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 

video.hide();
   
    
/////////////////////////////////
    
    
rectMode(CENTER);  
angleMode(DEGREES);
    
    
}
////////////////////////////////////////////

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    console.log(poses);
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
    } 
    
} 

//////////////////////////////////////////////////


function draw(){
    r = random(55,255); // makes random variables which can be used on the pose points and skeleton
  g = random(55,255); 
  b = random(55, 255);
////////////////////////////////////////////////

image(video, 0, 0,width,height);

filter(THRESHOLD,1);    

    
    if(pose){
        //noStroke();
    fill(r,g,b);
    stroke(r,g,b);
    

        
        
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
        
   ellipse(pose.nose.x, pose.nose.y, d*3);
    
        let v = createVector(pose.nose.x,pose.nose.y);
        
        history.push(v);
        
        let head = history[history.length-1].copy();
        history.push(head);

        history.shift();
        
     
        
        for(let i = 0; i < history.length-1; i++){
          
            drawHeadSpace(history[i].x,history[i].y);
            
        }
    //}
    //adjusted face image to cover face
   // image(img2,pose.nose.x -150, pose.nose.y-150,300, 300 );    
        
   // image(img1, ((pose.leftWrist.x)-50),pose.leftWrist.y , 150, 150);
    //added right wrist image
  //  image(img1, ((pose.rightWrist.x)-50),pose.rightWrist.y , 150, 150);


   
    ////////////////////////////////////////////////////////////// 
        
    for(let i=0; i < pose.keypoints.length;i++){

    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    
    rect(x,y,10,10);
    angle+=0.01;  
        

        
    for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(20);
        stroke(r,g,b);
        line(a.position.x, a.position.y,b.position.x, b.position.y );
        fill(r,g,b);
      
        }    
    }
}  
    
    
}

function drawHeadSpace(x,y){
        noStroke();
        fill(r,g,b);

    if(history.length > 10){
        console.log("more than 2");
        history.splice(0,1);
        }
    }
    //stops and starts video and song on mouse click
    function mousePressed() {
        if (song.isPlaying()) {
          // .isPlaying() returns a boolean
          song.pause();
        frameRate(0);

        } else {
          song.play();
          voice.speak('Lets go!')
          frameRate(30);
          
    
        }
      }
/////////////////////////////////////////////////////////////