var color = [];
var song, fft;

function preload() {
    song = loadSound('song' + random([1, 2, 3]) + '.mp3');
}

function setup() {
    // createCanvas(1024, 720);
    createCanvas(windowWidth, windowHeight);
    soundFormats('mp3');
    color = [random(0, 255), random(0, 255), random(0, 255)];
    song.play();
    fft = new p5.FFT();
    fft.setInput(song);
}

function draw() {
    background(color);
    var r = 120;
    var d = 8.25;
    var MAX = 330;
    var count = 19;
    var spec = fft.analyze();
    push();
    translate(width / 2 - 300, height / 2);
    for (var n = 0; n < 10; n++) {
        for (var a = 0; a <= 360; a += 1) {
            var progress = constrain(map(spec[n], 0, 255, 0, 1), 0, 1);
            var ease = -0.5 * (cos(progress * PI) - 1);
            var phase = 0 + 2 * PI * ease + PI + radians(map(frameCount % MAX, 0, MAX, 0, 360));
            var x = map(a, 0, 360, -r, r);
            var y = r * sqrt(1 - pow(x / r, 2)) * sin(radians(a) + phase);
            ellipse(x, y, 1, 1);
        }
    }
    pop();
    push();
    translate(width / 2 + 300, height / 2);
    for (var n = 400; n < 410; n++) {
        for (var a = 0; a <= 360; a += 1) {
            var progress = constrain(map(spec[n], 0, 255, 0, 1), 0, 1);
            var ease = -0.5 * (cos(progress * PI) - 1);
            var phase = 0 + 2 * PI * ease + PI + radians(map(frameCount % MAX, 0, MAX, 0, 360));
            var x = map(a, 0, 360, -r, r);
            var y = r * sqrt(1 - pow(x / r, 2)) * sin(radians(a) + phase);
            ellipse(x, y, 1, 1);
        }
    }
    pop();
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
    return false;
}