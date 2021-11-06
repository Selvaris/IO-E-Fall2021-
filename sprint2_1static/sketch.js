let img;
let poseNet;
let poses = [];


function setup() {
    //tried to figure out how to change the canvas size based on any image link provided like img.height 
createCanvas(677, 1000);
//sources
//https://editor.p5js.org/ml5/sketches/PoseNet_image_single
    // https://www.pexels.com/photo/mature-black-man-in-outerwear-sitting-on-bench-7869587/
    // https://www.pexels.com/photo/positive-female-in-trendy-clothes-standing-near-stairs-on-street-8117130/
    //https://www.pexels.com/photo/man-wearing-yellow-outfit-3622614/
    //https://www.pexels.com/photo/woman-wearing-pink-overcoat-and-black-inner-top-2043590/

    //Change the images based on the options presented in the code
    // I wanted to add buttons to change the photo inside the website, but I didn't know how I would get them to work without 
    //displacing the skeleton  and requiring a site refresh
    img = createImg('images/whitetop.jpg', imageReady);

    img.size(width,height);

    img.hide(); 
    frameRate(1); 
}

function imageReady(){

    let options = {
        imageScaleFactor: 1,
        minConfidence: 0.1
    }

    poseNet = ml5.poseNet(modelReady, options);

    poseNet.on('pose', function (results) {
        poses = results;
    });
}


function modelReady() { 
    select('#status').html('Change the image to runner, fury, jumper, or whitetop in the code to change the skeleton');
     
  
    poseNet.singlePose(img)
}


function draw() {
    if (poses.length > 0) {
        image(img, 0, 0, width, height);
        drawSkeleton(poses);
        drawKeypoints(poses);
        noLoop();
    }

}

function drawKeypoints() {

    for (let i = 0; i < poses.length; i++) {

        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {

            let keypoint = pose.keypoints[j];

            if (keypoint.score > 0.2) {
                fill(255);
                stroke(20);
                strokeWeight(4);
                ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
            }
        }
    }
}



function drawSkeleton() {

    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;

        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            strokeWeight(1);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
