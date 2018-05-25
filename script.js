var color = [];
var song, fft;i

function preload() {
    song = loadSound('song3.mp3');
}

function setup() {
    // createCanvas(1024, 720);
    createCanvas(windowWidth, windowHeight);
    soundFormats('mp3');
    color = [random(0, 255), random(0, 255), random(0, 255)];
    song.setVolume(1);
    song.play();
    fft = new p5.FFT();
    fft.setInput(song);
}

function draw() {
    background(color);
    var spec = fft.analyze();
    for (i = 0; i < spec.length; i++) {
        stroke(spec[i]);
        line(map(i, 0, spec.length, 0, width), 0, map(i, 0, spec.length, 0, width), map(spec[i], 0, 255, height, 0));
    }
    fill(255);
    textSize(56);
    if (song.isPlaying()) {
        text("Playing", width / 2 - 30, 50);
    } else {
        text("Paused", width / 2 - 30, 50);
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (song.isPlaying()) {
            song.pause(0);
        } else {
            song.play();
        }
    }
    return false; // prevent default
}