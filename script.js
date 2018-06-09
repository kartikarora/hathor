var song, fft, to, spectrum, bottomGraphics, topGraphics;
var r, loaded = false, save, spotify, line, circle, type;
var lines = [], circles = [];
var songNames = ['Heavy Metal', 'Canon', 'Bohemian Rhapsody', 'Radio Ga Ga'];
var songArtist = ['Justice', 'Justice', 'The Queen', 'The Queen'];
var songUrls = ['https://open.spotify.com/track/621W0YFtYurfPC6hwvmWgc?si=ihsnFk3bSzeIKPWlB9J7Cg',
    'https://open.spotify.com/track/5GsdNmkpAbtZnUt5VxtbHm?si=B3gu3WrcSNmmCA64eOTIOQ',
    'https://open.spotify.com/track/1ONqVFerUEyoXpgtBpbzfM?si=P56G95CKSmel-5l1rCpz2w',
    'https://open.spotify.com/track/30cjrAb2I858LOMhwGcrjd?si=6fUurRWaSruNQ1ueE0lBIQ'];

/**
 * Initiates setup of song and images
 */
function setup() {
    createCanvas(700, 850);
    topGraphics = createGraphics(700, 700); // top graphics
    bottomGraphics = createGraphics(700, 150); // bottom graphics
    r = random([1, 2, 3, 4]); // random song selector
    type = random([1, 2]); // random visualizer
    save = createImg(r > 2 ? 'save_dark.png' : 'save_light.png');
    spotify = createImg(r > 2 ? 'spotify_dark.png' : 'spotify_light.png');
    line = createImg(r > 2 ? 'line_dark.png' : 'line_light.png');
    circle = createImg(r > 2 ? 'circle_dark.png' : 'circle_light.png');
    song = loadSound('song' + r + '.mp3', loadingComplete);
    soundFormats('mp3');
}

/**
 * Custom function, acts as a setup when loading is complete
 */
function loadingComplete() {
    song.setLoop(false);
    song.play();
    song.setVolume(0.5);
    fft = new p5.FFT();
    fft.setInput(song);
    to = color(0, 0, 0);
    loaded = true;
    line.position(width / 2 - 100 - 24, height - 120);
    circle.position(width / 2 + 100 - 24, height - 120);
    save.position(width / 2 - 100 - 24, height - 60);
    spotify.position(width / 2 + 100 - 24, height - 60);
    save.hide();
    spotify.hide();
    save.mousePressed(saveArt);
    spotify.mousePressed(openSpotify);
    line.mousePressed(changeToLines);
    circle.mousePressed(changeToCircle);
    topGraphics.pixelDensity(1);
    bottomGraphics.pixelDensity(1);
    pixelDensity(1);
}


function draw() {
    if (loaded) {
        //Top Graphics
        spectrum = fft.analyze().splice(0, 640);
        topGraphics.background(r > 2 ? 0 : 255);

        // borders
        topGraphics.stroke(r > 2 ? 255 : 0);
        topGraphics.strokeWeight(2);
        topGraphics.line(64, 64, map(song.currentTime(), 0, song.duration(), 64, topGraphics.width - 64), 64);
        topGraphics.line(64, 64, 64, map(song.currentTime(), 0, song.duration(), 64, topGraphics.height - 64));
        topGraphics.line(topGraphics.width - 64, topGraphics.height - 64, topGraphics.width - 64, map(song.currentTime(), 0, song.duration(), topGraphics.height - 64, 64));
        topGraphics.line(topGraphics.width - 64, topGraphics.height - 64, map(song.currentTime(), 0, song.duration(), topGraphics.width - 64, 64), topGraphics.height - 64);

        // spectral lines
        if (type === 1) {
            // remove old lines
            while (lines.length > 0) {
                lines.pop();
            }
            // realtime line value generation
            for (var i = 0; i < 5; i++) {
                lines.push(new Line(
                    (i * (topGraphics.height - 512) / 6) + 256,
                    color(r > 2 ? 255 : 0),
                    splitSpectrum(spectrum, spectrum.length / 5)[i]
                ))
                ;
            }
            // draw each line on top graphics
            lines.forEach(function (line) {
                line.draw(topGraphics);
            });
        } else {
            // remove old circles
            while (circles.length > 0) {
                circles.pop();
            } // realtime circle value generation
            for (var i = 0; i < 2; i++) {
                circles.push(new Circle(
                    color(r > 2 ? 255 : 0),
                    splitSpectrum(spectrum, spectrum.length / 2)[i],
                    i === 0 ? 100 : 100,
                    i === 0 ? 200 : 25
                ))
            }
            circles.forEach(function (circle) {
                circle.draw(topGraphics);
            });
        }

/*        topGraphics.fill(r > 2 ? 0 : 255, 30);
        topGraphics.rect(0, 0, topGraphics.width, topGraphics.height);*/

        // Draw the texts
        let text = new Texter(r > 2 ? 255 : 0, 32);
        text.draw(topGraphics);

        // Bottom Graphics
        bottomGraphics.background(r > 2 ? 255 : 0);
        spotify.show();
        save.show();
        line.show();
        circle.show();

        // Draw graphics on canvas
        image(topGraphics, 0, 0);
        image(bottomGraphics, 0, 700);

    } else {
        // Loading screen
        loadAnimation();
    }
}

/*
 * Function to load custom animation
 */
function loadAnimation() {
    background(r > 2 ? 0 : 255);
    fill(r > 2 ? 255 : 0);
    push();
    translate(width / 2, height / 2);
    ellipse(0, map(sin(frameCount / 10 % TWO_PI), -1, 1, 100, -100), 50);
    textSize(32);
    text("Prepare to be amazed", -150, 180);
}

/**
 * Function to handle pause and play of song
 */

function pauseToggle() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

/**
 * Save album art as png file; only the top graphics
 */
function saveArt() {
    saveCanvas(topGraphics, 'album_art', 'png');
}

/**
 * Open current song on Spotify
 */
function openSpotify() {
    window.open(songUrls[r - 1], '_blank');
}

/**
 * Split spectrum array into multiple chunks for plotting on line or circle
 */
function splitSpectrum(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

function changeToCircle() {
    type = 2;
}

function changeToLines() {
    type = 1;
}

/**
 * Callback for keyboard key press
 */
function keyPressed() {
    if (keyCode === 32) {
        pauseToggle();
    }
    return false;
}