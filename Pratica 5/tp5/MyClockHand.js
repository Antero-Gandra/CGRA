/**
 * MyClockHand
 * @param gl {WebGLRenderingContext }
 * @constructor
 */

class MyClockHand extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
    };