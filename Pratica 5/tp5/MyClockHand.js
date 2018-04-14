/**
 * MyClockHand
 * @param gl {WebGLRenderingContext }
 * @constructor
 */

var HAND_Z = 0.02;

var HOUR_X = 0.2;
var HOUR_Y = 0.02;
var MIN_X = 0.35;
var MIN_Y = 0.01;
var SEC_X = 0.45;
var SEC_Y = 0.005;

class MyClockHand extends CGFobject {
    constructor(scene, type = 0, angle = 0) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.type = type;
        this.setAngle(angle);
    };

    setAngle(angle) {
        this.angle = (Math.PI / 2) - (angle * Math.PI / 180);
    }

    display() {

        this.scene.pushMatrix();        
            this.scene.rotate(this.angle, 0, 0, 1);
            if (this.type == 0) this.scene.scale(HOUR_X, HOUR_Y, HAND_Z);
            if (this.type == 1) this.scene.scale(MIN_X, MIN_Y, HAND_Z);
            if (this.type == 2) this.scene.scale(SEC_X, SEC_Y, HAND_Z);
            this.scene.translate(0.5, 0, 0);
            this.cube.display();
        this.scene.popMatrix();
    }
}