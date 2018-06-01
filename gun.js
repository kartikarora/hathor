class Gun {
    constructor(x, y, stroke, debug = false) {
        this._base = createVector(width / 2, height / 2);
        this._end = createVector(x - this._base.x > 80 ? 80 : x - this._base.x < -80 ? -80 : x - this._base.x,
            y - this._base.y > 80 ? 80 : y - this._base.y < -80 ? -80 : y - this._base.y);
        this._heading = createVector(x, y);
        this._stroke = stroke;
        this._debug = debug;
    }

    draw() {
        push();
        translate(this._base.x, this._base.y);
        strokeWeight(20);
        stroke(this._stroke);
        rotate(this._heading.heading());
        if (this._debug) {
            line(0, 0, this._end.x, this._end.y);
        }
        pop();
    }
}