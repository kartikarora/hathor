var song, fft, to, spec, canvas;
var r, loaded = false;

function loadingComplete() {
    song.setLoop(false);
    song.play();
    song.onended(songEnded);
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);

    // player_img = r > 2 ? createImg('pause.svg') : createImg('pause_dark.svg');
    // player_img.position(windowWidth / 2 - 24, windowHeight - 120);
    // player_img.mousePressed(songStateChange);
    loaded = true;
}

function setup() {
    canvas = createCanvas(845, 845);
    centerCanvas();
    r = random([1, 2, 3, 4]);
    song = loadSound('song' + r + '.mp3', loadingComplete);
    soundFormats('mp3');
}

function draw() {
    if (loaded) {
        spec = fft.analyze();
        background(r > 2 ? 0 : 255);

        let gun = new Gun(mouseX, mouseY, r > 2 ? 255 : 0, true);
        gun.draw();

        // borders
        push();
        translate(width - 8, 8);
        strokeWeight(4);
        stroke(r > 2 ? 255 : 0);
        line(0, 0, map(song.currentTime(), 0, song.duration(), 0, -width + 8), 0);
        pop();

        push();
        translate(width - 8, 8);
        strokeWeight(4);
        stroke(r > 2 ? 255 : 0);
        line(0, 0, 0, map(song.currentTime(), 0, song.duration(), 0, height - 8));
        pop();

        push();
        translate(8, height - 8);
        strokeWeight(4);
        stroke(r > 2 ? 255 : 0);
        line(0, 0, map(song.currentTime(), 0, song.duration(), 0, width - 8), 0);
        pop();

        push();
        translate(8, height - 8);
        strokeWeight(4);
        stroke(r > 2 ? 255 : 0);
        line(0, 0, 0, map(song.currentTime(), 0, song.duration(), 0, -height + 8));
        pop();
    } else {
        background(r > 2 ? 0 : 255);
        fill(r > 2 ? 255 : 0);
        push();
        translate(width / 2, height / 2);
        ellipse(0, map(sin(frameCount / 10 % PI), -1, 1, 50, -50), 50);
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.play();
        }
    }
    return false;
}

function mousePressed() {

}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function songEnded() {
    saveCanvas('album_art', 'png');
}