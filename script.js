var song, fft, from, to, spec;

function preload() {
    song = loadSound('song' + random([1, 2, 3]) + '.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    soundFormats('mp3');
    song.play();
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);
}

function draw() {
    spec = fft.analyze();
    from = to;
    to = color(spec[0], spec[341], spec[682]);
    background(lerpColor(from, to, 0.5));
    push();
    translate(0, height / 2);
    noStroke();
    for (var x = 0; x < width; x += (width / spec.length)) {
        ellipse(map(x, 0, spec.length, 0, width), map(spec[x], 0, 255, height / 2, -height / 2), map(spec[x], 0, 255, 0, 100));
    }
    pop();
    push();
    translate(width / 2, 0);
    fill(255);
    textSize(56);
    if (song.isPlaying()) {
        text("Playing", 0, 50);
    } else {
        text("Paused", 0, 50);
    }
    pop();
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