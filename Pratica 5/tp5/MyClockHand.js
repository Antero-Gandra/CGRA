/**
 * MyClockHand
 * @param gl {WebGLRenderingContext }
 * @constructor
 */

class MyClockHand extends CGFobject {
    constructor(scene,angle) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.setAngle(angle);
    };
}