class Circle {
    constructor(color, spectrum, min, max) {
        this._color = color;
        this._spectrum = spectrum;
        this._min = min;
        this._max = max;
    }

    draw(graphics) {
        graphics.push();
        graphics.translate(graphics.width / 2, graphics.height / 2);
        graphics.noStroke();
        graphics.fill(this._color);
        for (var i = 0; i < this._spectrum.length; i++) {
            graphics.rotate(i * TWO_PI / this._spectrum.length);
            graphics.ellipse(map(this._spectrum[i], 0, 255, this._min, this._max), 0, map(this._spectrum[i], 0, 255, 0, 5));
        }
        graphics.pop();
    }
}