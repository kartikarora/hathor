const DEBUG = true;

const Speed = 3;
const carSize = 50
;
var k = 0;
var g = 0;
const carCount = 30;

var maxSpeed = 10;
var maxAcc = 0.8;

//these variables control how far away a bird will look
var cohesionDist = 100;
var seperationDist = 60;
var alignmentDist = 100;

//we can use these to scale how important cohesion, seperation and alignment are
var cohesionWeight = 1;
var seperationWeight = 10;
var alignmentWeight = 1;

//extra control for setting the influence of really close birds on seperation
var seperationMuiltiplier = 30;

var cars = [];
var cars2 = [];

//var cars3 = [];

function setup() {
    createCanvas(1280, 1280);
    background(255);
    rectMode(RADIUS);

    for (var i = 0; i < carCount; i++) {
        cars[i] = new Car(random(width), random(height))
        ; //fill array with randomly placed birds
    }
    /*	for (var i = 0; i < 5; i++) {
        cars2[i] = new Car(random(width), random(height), color(255, 0, 0))
        ; //fill array with randomly placed birds
    }*/
    for (var i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            cars2[i] = new Car(random(width), random(height), color(255, 0, 0))
        }
        else {
            cars2[i] = new Car(random(width), random(height), color(0, 0, 255))
            ; //fill array with randomly placed birds

        }
        ; //fill array with randomly placed birds
    }
}

function draw() {
    background(255);


    for (var c of cars) { //this is a nice notation to get each element of an array
        c.run(); //for each bird, lets call the run method
    }

    for (var i = 0; i < cars2.length; i++) { //this is a nice notation to get each element of an array
        var c = cars2[i];
        c.run(true, i); //for each bird, lets call the run method
    }


    /*	if (k<5){
 for (var c of cars3) {


        c.run(true);
     //for each bird, lets call the run method
    }

}
}

function mousePressed() {
    k++

if (k = 4){
k= 0
}
}
    */
}


function Car(startX, startY, fillColor = 0) { //here is the Bird class were we define what a bird object is
    this.pos = createVector(startX, startY);

    this.vel = p5.Vector.random2D(); //this makes a new vector with random angle and magnitude 1
    this.vel.mult(Speed);

    this.acc = createVector(0, 0);

    this.run = function (modify = false, i = -1) { //the run function first updates, then draws this bird
        this.update(modify, i);
        this.render();
        if (DEBUG) {
            arrow(this.pos.x, this.pos.y, this.vel, 5, '#00ff00');
        }
    }

    this.render = function () {
        push();
        fill(fillColor);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading()); //this makes sure the birds face the way they are going
        rect(0, 0, carSize, carSize / 2);
        pop();
    }

    this.update = function (modify, i) {


        if (modify) {
            if (i % 2 == 0) {

                //Simple wrapping, if the birds go off the screen we bring them back
                if (this.pos.x > width + carSize) this.pos.x = -carSize; //super simple if statements dont need a new block {  }
                if (this.pos.x < -carSize) this.pos.x = width + carSize;
                if (this.pos.y > height + carSize) this.pos.y = -carSize;
                if (this.pos.y < -carSize) this.pos.y = height + carSize;

            }
            else {
                this.vel = cars[i - 1].vel.copy();
                this.pos = cars[i - 1].pos.add(createVector(10, 10));

                //Simple wrapping, if the birds go off the screen we bring them back
                if (this.pos.x > width + carSize) this.pos.x = -carSize; //super simple if statements dont need a new block {  }
                if (this.pos.x < -carSize) this.pos.x = width + carSize;
                if (this.pos.y > height + carSize) this.pos.y = -carSize;
                if (this.pos.y < -carSize) this.pos.y = height + carSize;
            }

        }
        else {
            //first we calculate the forces acting on each bird
            this.acc.mult(0);
            //	this.acc.add(this.cohesion().mult(cohesionWeight));
            //	this.acc.add(this.alignment().mult(alignmentWeight));
            //this.acc.add(this.seperation().mult(seperationWeight));


            var m = createVector(mouseX, mouseY);
            if (m.dist(this.pos) < 100) {
                var towardsCar = p5.Vector.sub(this.pos, m);
                this.acc.add(towardsCar.mult(10));
            }

            this.acc.limit(maxAcc);

            //we add the acceleration onto the velocity
            this.vel.add(this.acc);
            this.vel.limit(maxSpeed);

            //and finally add the velocity onto the positions
            this.pos.add(this.vel);

            //Simple wrapping, if the birds go off the screen we bring them back
            if (this.pos.x > width + carSize) this.pos.x = -carSize; //super simple if statements dont need a new block {  }
            if (this.pos.x < -carSize) this.pos.x = width + carSize;
            if (this.pos.y > height + carSize) this.pos.y = -carSize;
            if (this.pos.y < -carSize) this.pos.y = height + carSize;

        }
    }

    //this function calculates the average location of nearby birds
    /*	this.cohesion = function() {
            var carAverage = createVector(0, 0);
            var count = 0;

            for (var c of cars) {
                var distance = dist(c.pos.x, c.pos.y, this.pos.x, this.pos.y);
                if (distance > 0 && distance < cohesionDist) { //check if bird is close enough but not itself
                    carAverage.add(c.pos);
                    count++;
                }
            }

            if (count > 0) { //incase we are all alone, don't divide by 0
                carAverage.div(count);
            }

            return carAverage.sub(this.pos); //we want to get the vector that points towards this average
        }


        //this function calculates the average direction away from nearby birds
        this.seperation = function() {
            var carAverage = createVector(0, 0);
            var count = 0;

            for (var c of cars) {
                var distance = dist(c.pos.x, c.pos.y, this.pos.x, this.pos.y);
                if (distance > 0 && distance < seperationDist) { //check if bird is close enough but not itself
                    var vecAway = p5.Vector.sub(this.pos, c.pos); //we want the average direction away from nearby birds
                    vecAway.normalize(); //normalize the vector because we only care about direction, not magnitude
                    vecAway.mult(map(distance, 0, seperationDist, seperationMuiltiplier, 0)); //closer birds have bigger influence
                    carAverage.add(vecAway);
                    count++;
                }
            }

            if (count > 0) { //incase we are all alone, don't divide by 0
                carAverage.div(count);
            }
            return carAverage; //this time we are talking about a direction so no need to subtract
        }   */

    //this function calculates the average direction of nearby birds
    this.alignment = function () {
        var carAverage = createVector(0, 0);
        var count = 0;

        for (var c of cars) {
            var distance = dist(c.pos.x, c.pos.y, this.pos.x, this.pos.y);
            if (distance > 0 && distance < alignmentDist) {
                carAverage.add(c.vel); //we want the average velocity this time
                count++;
            }
        }

        if (count > 0) { //incase we are all alone, don't divide by 0
            carAverage.div(count);
        }

        return carAverage;
    }
}

function arrow(x1, y1, vec, scale, col) {
    var end = vec.mag() * scale;

    push();
    strokeWeight(1);
    stroke(col);
    fill(col);

    translate(x1, y1);
    rotate(vec.heading());

    line(0, 0, end, 0);
    triangle(end, 0, end - 2, -1, end - 2, 1);
    pop();
}