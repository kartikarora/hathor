var song, fft, to, spectrum, canvas, bg, tg;
var r, loaded = false, save, spotify;
var lines = [];
var song_name = ['Heavy Metal', 'Canon', 'Bohemian Rhapsody', 'Radio Ga Ga'];
var song_artist = ['Justice', 'Justice', 'The Queen', 'The Queen'];
var song_url = ['https://open.spotify.com/track/621W0YFtYurfPC6hwvmWgc?si=ihsnFk3bSzeIKPWlB9J7Cg',
    'https://open.spotify.com/track/5GsdNmkpAbtZnUt5VxtbHm?si=B3gu3WrcSNmmCA64eOTIOQ',
    'https://open.spotify.com/track/1ONqVFerUEyoXpgtBpbzfM?si=P56G95CKSmel-5l1rCpz2w',
    'https://open.spotify.com/track/30cjrAb2I858LOMhwGcrjd?si=6fUurRWaSruNQ1ueE0lBIQ'];

function loadingComplete() {
    song.setLoop(false);
    song.play();
    song.setVolume(0.5);
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);
    loaded = true;
    save.position(width / 2 - 100-24, windowHeight - 150);
    spotify.position(width / 2 + 100-24, windowHeight - 150);
    save.hide();
    spotify.hide();
    save.mousePressed(saveArt);
    spotify.mousePressed(openSpotify);
}

function setup() {
    canvas = createCanvas(756, 856);
    bg = createGraphics(756, 100);
    tg = createGraphics(756, 756);
    r = random([1, 2, 3, 4]);
    save = createImg(r > 2 ? 'save_dark.svg' : 'save_light.svg');
    spotify = createImg(r > 2 ? 'spotify_dark.svg' : 'spotify_light.svg');
    song = loadSound('song' + r + '.mp3', loadingComplete);
    soundFormats('mp3');
}

function draw() {
    if (loaded) {
        //Top Graphics
        spectrum = fft.analyze().splice(0, 640);
        tg.background(r > 2 ? 0 : 255);

        // borders
        tg.stroke(r > 2 ? 255 : 0);
        tg.strokeWeight(2);
        tg.line(64, 64, map(song.currentTime(), 0, song.duration(), 64, tg.width - 64), 64);
        tg.line(64, 64, 64, map(song.currentTime(), 0, song.duration(), 64, tg.height - 64));
        tg.line(tg.width - 64, tg.height - 64, tg.width - 64, map(song.currentTime(), 0, song.duration(), tg.height - 64, 64));
        tg.line(tg.width - 64, tg.height - 64, map(song.currentTime(), 0, song.duration(), tg.width - 64, 64), tg.height - 64);

        // spectral lines
        while (lines.length > 0) {
            lines.pop();
        }
        for (var i = 0; i < 5; i++) {
            lines.push(new Line(
                (i * (tg.height - 512) / 6) + 256,
                color(r > 2 ? 255 : 0),
                splitSpectrum(spectrum, 128)[i]
            ));
        }

        lines.forEach(function (line) {
            line.draw(tg);
        });

        // text
        tg.fill(r > 2 ? 255 : 0);
        tg.textSize(32);

        tg.push();
        tg.translate(tg.width / 2, tg.height / 2);
        tg.rotate(-PI / 2);
        tg.translate(-tg.width / 2, -tg.height / 2);
        tg.text(song_artist[r - 1], 32, 44);
        tg.pop();

        tg.push();
        tg.translate(tg.width / 2, tg.height / 2);
        tg.rotate(PI / 2);
        tg.translate(-tg.width / 2, -tg.height / 2);
        tg.text(song_name[r - 1], 32, 44);
        tg.pop();

        // Bottom Graphics
        bg.background(r > 2 ? 255 : 0);
        spotify.show();
        save.show();

        // draw canvas
        image(tg, 0, 0);
        image(bg, 0, 757);

    } else {
        background(r > 2 ? 0 : 255);
        fill(r > 2 ? 255 : 0);
        push();
        translate(width / 2, height / 2);
        ellipse(0, map(sin(frameCount / 10 % PI), -1, 1, 100, -100), 50);
    }
}

function keyPressed() {
    if (keyCode === 32) {
        pauseToggle();
    }
    return false;
}

function pauseToggle() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function saveArt() {
    saveCanvas(tg, 'album_art', 'png');
}

function openSpotify() {
    window.open(song_url[r - 1], '_blank');
}

function splitSpectrum(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}