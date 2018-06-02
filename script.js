var song, fft, to, spectrum, canvas, font;
var r, loaded = false;
var lines = [];
var song_name = ['Heavy Metal', 'Canon', 'Bohemian Rhapsody', 'Radio Ga Ga'];
var song_artist = ['Justice', 'Justice', 'The Queen', 'The Queen'];

function loadingComplete() {
    song.setLoop(false);
    song.play();
    song.setVolume(0.5);
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);
    loaded = true;
}

function setup() {
    canvas = createCanvas(856, 856);
    centerCanvas();
    r = random([1, 2, 3, 4]);
    font = loadFont('font.ttf');
    song = loadSound('song' + r + '.mp3', loadingComplete);
    soundFormats('mp3');

}

function draw() {
    if (loaded) {
        spectrum = fft.analyze().splice(0, 640);
        background(r > 2 ? 0 : 255);

        // borders
        stroke(r > 2 ? 255 : 0);
        strokeWeight(2);
        line(64, 64, map(song.currentTime(), 0, song.duration(), 64, width - 64), 64);
        line(64, 64, 64, map(song.currentTime(), 0, song.duration(), 64, height - 64));
        line(width - 64, height - 64, width - 64, map(song.currentTime(), 0, song.duration(), height - 64, 64));
        line(width - 64, height - 64, map(song.currentTime(), 0, song.duration(), width - 64, 64), height - 64);

        // spectral lines
        while (lines.length > 0) {
            lines.pop();
        }
        for (var i = 0; i < 5; i++) {
            lines.push(new Line(
                (i * (height - 512) / 6) + 256,
                color(r > 2 ? 255 : 0),
                splitSpectrum(spectrum, 128)[i]
            ));
        }

        lines.forEach(function (line) {
            line.draw();
        });

        // text
        fill(r > 2 ? 255 : 0);
        textSize(32);
        // textFont(font);
        // textStyle(ITALIC);
        push();
        translate(width / 2, height / 2);
        rotate(-PI / 2);
        translate(-width / 2, -height / 2);
        text(song_artist[r - 1], 32, 44);
        pop();
        push();
        translate(width / 2, height / 2);
        rotate(PI / 2);
        translate(-width / 2, -height / 2);
        text(song_name[r - 1], 32, 44);
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

function saveArt() {
    saveCanvas('album_art', 'png');
}

function splitSpectrum(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}