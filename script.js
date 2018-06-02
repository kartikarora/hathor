var song, fft, to, spectrum, canvas;
var r, loaded = false;
var lines = [];

function loadingComplete() {
    song.setLoop(false);
    song.play();
    song.setVolume(0.5);
    song.onended(songEnded);
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);

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
        spectrum = fft.analyze();
        background(r > 2 ? 0 : 255);

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

        while (lines.length > 0) {
            lines.pop();
        }
        for (var i = 0; i < 8; i++) {
            lines.push(new Line(
                (i * (height - 512) / 9) + 256,
                color(r > 2 ? 255 : 0),
                splitSpectrum(spectrum, 128)[i]
            ));
        }

        lines.forEach(function (line) {
            line.draw();
        });

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
        mousePressed();
    }
    return false;
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function songEnded() {
    saveCanvas('album_art', 'png');
}

function splitSpectrum(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}