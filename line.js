class Line {
    constructor(height, color, spectrum) {
        this._height = height;
        this._color = color;
        this._spectrum = spectrum;
    }

    draw() {
        push();
        translate(0, this._height);
        noStroke();
        fill(this._color);
        for (var i = 0; i < this._spectrum.length; i++) {
            ellipse(map(i, 0, this._spectrum.length, 256, width - 256), map(this._spectrum[i], 0, 255, 64, 0), map(this._spectrum[i], 0, 255, 1, 10));
        }
        pop();
    }
}