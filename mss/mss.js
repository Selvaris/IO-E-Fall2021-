


let video;
let pose;

let skeleton;
let angle=0;
let history = [];
let r;

function setup(){
   
/////////////////////////////////



    
frameRate(30);     
createCanvas(1728,972);
noStroke();    
video = createCapture(VIDEO);
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 

video.hide(); 
//video.show

rectMode(CENTER);  
angleMode(DEGREES);
    
    
}
////////////////////////////////////////////

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
       // console.log(poses);
    } 
    
} 
//I unsuccessfully attempted to make a function that pauses the screen or covers it 
//with a black layer when bodies are not detected so it is more jarring to the user 
//function dark(poses){
//   if(poses.length > 0){
    
    //    document.getElementById('body').style.color = "";
  
 //  } else{
        
  //     document.getElementById('body').style.color="black";
  //  }
//}

function draw(){
   
////////////////////////////////////////////////
    
image(video, 0, 0,width,height);
//TRESHOLD 0 is white - 1 is black
//filter(THRESHOLD,1);    

    
    if(pose){
        //noStroke();
    noFill();    
    stroke(147, 0, 0);
    

        
        
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
        
   square(pose.nose.x, pose.nose.y, d*3);
   //box hovers over users face
    
        let v = createVector(pose.nose.x,pose.nose.y);
        
        history.push(v);
        //console.log("history.length " + history.length);
        let head = history[history.length-1].copy();
        history.push(head);
        //console.log("head " + );
        //head.x += pose.nose.x;
        //head.y += pose.nose.y;
        history.shift();
        
        //if(history.length > 50){
        
        for(let i = 0; i < history.length-6; i++){
            //console.log("history[i].y " + history[i].y);
            //ellipse(history[i].x, history[i].y, d*3);
            //console.log("i");

            //alter loctation of headspace
            drawHeadSpace(history[i].x +300,history[i].y - 150);
            
        }

    
    
}

function drawHeadSpace(x,y){
    //frameRate(1);
        noStroke();
        fill(255,255,255);
        let msg = "Location: " + x  + ", " + "\n"+ y +"\n" +
        "Name:" + (Math.random() + 1).toString(36).substring(7) + (Math.random() + 1).toString(36).substring(7) +  "\n" +
        "Address:" +  (Math.random() + 1).toString(36).substring(7)+"\n" +
        "Routes" +  (Math.random() + 1).toString(36).substring(7)
        ;


        textSize(16);
        text(msg, x, y);
        //ellipse(x, y,100);
        //console.log("drawHeadSpace " + x);
        //history.splice(0,1); 
    if(history.length > 10){
        console.log("more than 2");
        history.splice(0,1);
        }
    }
}


