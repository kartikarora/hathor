var song, fft, from, to, spec, player_img, canvas;
var r, loaded = false;

function loadingComplete() {
    song.setLoop(false);
    song.play();
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);

    player_img = r > 2 ? createImg('pause.svg') : createImg('pause_dark.svg');
    player_img.position(windowWidth / 2 - 24, windowHeight - 130);
    player_img.mousePressed(songStateChange);
    loaded = true;
}

function setup() {
    canvas = createCanvas(1500, 845);
    centerCanvas();
    r = random([1, 2, 3, 4]);
    song = loadSound('song' + r + '.mp3', loadingComplete);
    soundFormats('mp3');
}

function draw() {
    if (loaded) {
        spec = fft.analyze();
        from = to;
        to = r > 2 ? color(spec[0], spec[341], spec[682]) : color(255 - spec[0], 255 - spec[341], 255 - spec[682]);
        background(lerpColor(from, to, 0.5));
        push();
        translate(0, height);
        noStroke();
        for (var x = 0; x < width; x++) {
            fill(r > 2 ? 255 : 0);
            ellipse(map(Math.log(x + 2), 0, Math.log(1024), 0, width), map(spec[x], 0, 255, height, 0) - height, map(spec[x], 0, 255, 0, 50));
        }
        pop();

        push();
        translate(width / 2, height - 2);
        strokeWeight(4);
        stroke(r > 2 ? 255 : 0);
        line(-map(song.currentTime(), 0, song.duration(), 0, width / 2), 0, map(song.currentTime(), 0, song.duration(), 0, width / 2), 0);
        pop();
    } else {
        background(r > 2 ? 0 : 255);
        fill(r > 2 ? 255 : 0);
        push();
        translate(width / 2, height / 2);
        ellipse(0, map(sin(frameCount % PI), 50));
    }
}

function keyPressed() {
    if (keyCode === 32) {
        songStateChange();
    }
    return false;
}

function songStateChange() {
    if (song.isPlaying()) {
        song.pause();
        player_img.attribute('src', r > 2 ? 'play.svg' : 'play_dark.svg');
    } else {
        song.play();
        player_img.attribute('src', r > 2 ? 'pause.svg' : 'pause_dark.svg');
    }
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function xZero() {
    return (windowWidth - width) / 2;
}

function yZero() {
    return (windowHeight - height) / 2;
}