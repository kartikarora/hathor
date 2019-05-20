class Texter {
    constructor(color, textSize) {
        this._color = color;
        this._textSize = textSize;

    }

    draw(graphics) {
        // text
        graphics.fill(this._color);
        graphics.textSize(this._textSize);

        // artist name
        graphics.push();
        graphics.translate(graphics.width / 2, graphics.height / 2);
        graphics.rotate(-PI / 2);
        graphics.translate(-graphics.width / 2, -graphics.height / 2);
        graphics.text(songArtist, 32, 44);
        graphics.pop();

        // song name
        graphics.push();
        graphics.translate(graphics.width / 2, graphics.height / 2);
        graphics.rotate(PI / 2);
        graphics.translate(-graphics.width / 2, -graphics.height / 2);
        graphics.text(songNames[songNumber - 1], 32, 44);
        graphics.pop();
    }
}