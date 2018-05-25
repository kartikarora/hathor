var x = [],y=[];
var color = [];
var  song, fft;

function preload(){
    song = loadSound('song3.mp3');
}

function setup() {
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
    for (i = 0; i<spec.length; i++) {
        fill(spec[i]);
        ellipse(map(i,0,spec.length,0,width),map(spec[i], 0, 255, height,0),10);
    }
}