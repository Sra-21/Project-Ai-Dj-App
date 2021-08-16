song1 = ""
song2 = ""
scoreRightWrist = 0
scoreLeftWrist = 0
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0
song1Status = ""
song2Status = ""

function preload() {
    song1 = loadSound("Smajavaragamana.mp3")
    song2 = loadSound("Vachindamma.mp3")
}

function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoded)
    poseNet.on('pose', gotPoses)
}

function modelLoded() {
    console.log("poseNet is initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rigtWristX =" + rightWristX + " ,rightWristY =" + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + " ,lefttWristY =" + leftWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 400, 400)
    song1Status = song1.isPlaying()
    song2Status = song2.isPlaying()
    fill("blue");
    stroke("blue")
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop()
        if (song2Status == false){
            song2.play()
            document.getElementById("song_name").innerHTML = "playing Vachindama"
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop()
        if (song1Status == false){
            song1.play()
            document.getElementById("song_name").innerHTML = "playing Samajavaragamana"
        }
    }
}

function play() {
    song.play()
    song.setVolume(1);
    song.rate(1)
}

function pause() {
    song.pause()
}

function stop() {
    song.stop()
}