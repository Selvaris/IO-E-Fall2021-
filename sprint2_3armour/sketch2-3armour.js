//Grab body part x,y locations from Posenet, and conjure fantasy equipment at designated points in the skeleton


let video;
let pose;
let img1;
let img2;
let img3;
let img4;
let skeleton;
let angle=0;
let history = [];


function setup(){
   
/////////////////////////////////
    
    
frameRate(15);     
createCanvas(1280, 960);
noStroke();    
video = createCapture(VIDEO);
video.hide();
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 
img1 = loadImage('images/blod.png');
img2 = loadImage('images/helm.png');    
img3 = loadImage('images/sword.png');    
img4 = loadImage('images/chest.png');    
// https://dragonfable.fandom.com/wiki/Blinding_Light_of_Destiny?file=Destiny+Axe.png
// https://www.pngall.com/armor-png/download/41343
//https://www.pngall.com/armor-png/download/41380
//https://pngimg.com/uploads/sword/sword_PNG5525.png
    
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
    
////////////////////////////////////////////////

image(video, 0, 0,width,height);



    
    if(pose){
    
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
        
 
        let v = createVector(pose.nose.x,pose.nose.y);
        
        history.push(v);
     
        let head = history[history.length-1].copy();
        history.push(head);
       
        history.shift();
        
    
        for(let i = 0; i < history.length-1; i++){
     
            drawHeadSpace(history[i].x,history[i].y);
            
        }
    //}
    //axe
    image(img1, ((pose.rightWrist.x)-150),pose.rightWrist.y -500, 300, 396);
//helmet
    image(img2,pose.nose.x -120, pose.nose.y-250,200, 250 );    
        
    //sword
    image(img3, ((pose.leftWrist.x)),pose.leftWrist.y-500 , 400, 532);
//chestplate
    image(img4,pose.leftShoulder.x-400 , pose.rightShoulder.y-120,480, 300 );    

   
    ////////////////////////////////////////////////////////////// 
        
    for(let i=0; i < pose.keypoints.length;i++){
    //for(let i=0; i < 5;i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    
    //rect(x,y,10,10);
    //Excluding pose points

        

        
    for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        noStroke();
     
        line(a.position.x, a.position.y,b.position.x, b.position.y );
      noFill();
      
        }    
    }
}  
    
    
}

function drawHeadSpace(x,y){
        noStroke();
        noFill();

    if(history.length > 10){
        console.log("more than 2");
        history.splice(0,1);
        }
    }

/////////////////////////////////////////////////////////////