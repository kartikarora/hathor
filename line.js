class Line {
    constructor(height, color, spectrum) {
        this._height = height;
        this._color = color;
        this._spectrum = spectrum;
    }

    draw(graphics) {
        graphics.push();
        graphics.translate(0, this._height);
        graphics.noStroke();
        graphics.fill(this._color);
        for (var i = 0; i < this._spectrum.length; i++) {
            graphics.ellipse(map(i, 0, this._spectrum.length, 256, graphics.width - 256),
                map(this._spectrum[i], 0, 255, 64, 0),
                map(this._spectrum[i], 0, 255, 1, 5));
        }
        graphics.pop();
    }
}