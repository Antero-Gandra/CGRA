/**
 * MyJeep
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var SLICES = 32;
var STACKS = 4;

class MyJeep extends CGFobject {
    constructor(scene) {
        super(scene);
        this.lamp = new MyHalfSphere(scene, SLICES, STACKS);
        this.tire = new MyCylinder(scene, SLICES, STACKS);
        this.quad = new MyQuad(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.windowsTrap = new MyTrapezoid(scene, 0.5, -1, 0.5);
        this.sideTrap = new MyTrapezoid(scene, 0.7, -1.7, 0, -1.5, 0);
        this.engineTrap = new MyTrapezoid(scene, 0.7, 0, 0.35, 0, 0.15);
    };

    display() {

        //Tire FR
        this.scene.pushMatrix();
            this.scene.translate(-1, 0.5, 1.0);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 0.5);
            this.tire.display();
        this.scene.popMatrix();
        //Tire FL
        this.scene.pushMatrix();
            this.scene.translate(1, 0.5, 1.0);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 0.5);
            this.tire.display();
        this.scene.popMatrix();
        //Tire BR
        this.scene.pushMatrix();
            this.scene.translate(-1, 0.5, -1.5);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 0.5);
            this.tire.display();
        this.scene.popMatrix();
        //Tire BL
        this.scene.pushMatrix();
            this.scene.translate(1, 0.5, -1.5);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 0.5);
            this.tire.display();
        this.scene.popMatrix();


        //engineRside
        this.scene.pushMatrix();
            this.scene.translate(-1, 0.8, 1.0);
            this.scene.rotate(-Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 1);
            this.engineTrap.display();
        this.scene.popMatrix();
        //engineLside
        this.scene.pushMatrix();
            this.scene.translate(1, 0.8, 1.0);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(-1, 1, 1);
            this.engineTrap.display();
        this.scene.popMatrix();

        //Right side
        this.scene.pushMatrix();
            this.scene.translate(-1, 0.8, 0);
            this.scene.rotate(-Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 1);
            this.sideTrap.display();
        this.scene.popMatrix();
        //Left side
        this.scene.pushMatrix();
            this.scene.translate(1, 0.8, 0);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(-1, 1, 1);
            this.sideTrap.display();
        this.scene.popMatrix();

        //windowsRside
        this.scene.pushMatrix();
            this.scene.translate(-1, 1.4, -0.5);
            this.scene.rotate(-Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(1, 1, 1);
            this.windowsTrap.display();
        this.scene.popMatrix();
        //windowsLside
        this.scene.pushMatrix();
            this.scene.translate(1, 1.4, -0.5);
            this.scene.rotate(Math.PI * 0.5, 0, 1, 0);
            this.scene.scale(-1, 1, 1);
            this.windowsTrap.display();
        this.scene.popMatrix();


        //Front Bumper
        this.scene.pushMatrix();
            this.scene.translate(0, 0.8, 1.75);
            this.scene.rotate(-Math.PI/11.3, 1, 0, 0);
            this.scene.scale(2, 0.73, 1);
            this.quad.display();
        this.scene.popMatrix();
        //Engine Top
        this.scene.pushMatrix();
            this.scene.translate(0, 1.15, 1.075);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(2, 1.15, 1);
            this.quad.display();
        this.scene.popMatrix();
        //Windshield
        this.scene.pushMatrix();
            this.scene.translate(0, 1.4, 0.25);
            this.scene.rotate(-Math.PI/4, 1, 0, 0);
            this.scene.scale(2, 0.71, 1);
            this.quad.display();
        this.scene.popMatrix();
        //Roof
        this.scene.pushMatrix();
            this.scene.translate(0, 1.65, -0.5);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(2, 1, 1);
            this.quad.display();
        this.scene.popMatrix();
        //BackWindow
        this.scene.pushMatrix();
            this.scene.translate(0, 1.4, -1.5);
            this.scene.rotate(-Math.PI/1.544, 1, 0, 0);
            this.scene.scale(2, 1.124, 1);
            this.quad.display();
        this.scene.popMatrix();
        //Back Bumper
        this.scene.pushMatrix();
            this.scene.translate(0, 0.8, -2.1);
            this.scene.rotate(-Math.PI/1.0972, 1, 0, 0);
            this.scene.scale(2, 0.725, 1);
            this.quad.display();
        this.scene.popMatrix();
        //Bottom
        this.scene.pushMatrix();
            this.scene.translate(0, 0.45, -0.175);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.scale(2, 4.05, 1);
            this.quad.display();
        this.scene.popMatrix();


        //Right Headlight
        this.scene.pushMatrix();
            this.scene.translate(-0.6, 0.9, 1.7);
            //this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.scale(0.3, 0.3, 0.2);
            this.lamp.display();
        this.scene.popMatrix();
        //Left Headlight
        this.scene.pushMatrix();
            this.scene.translate(0.6, 0.9, 1.7);
            //this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.scale(0.3, 0.3, 0.2);
            this.lamp.display();
        this.scene.popMatrix();

        //Right Mirror
        this.scene.pushMatrix();
            this.scene.translate(-1.1, 1.2, 0.3);
            this.scene.scale(0.2, 0.15, 0.1);
            this.cube.display();
        this.scene.popMatrix();
        //Left Mirror
        this.scene.pushMatrix();
            this.scene.translate(1.1, 1.2, 0.3);
            this.scene.scale(0.2, 0.15, 0.1);
            this.cube.display();
        this.scene.popMatrix();
        //Right Blinker
        this.scene.pushMatrix();
            this.scene.translate(-0.9, 1.025, 1.65);
            this.scene.scale(0.15, 0.1, 0.1);
            this.cube.display();
        this.scene.popMatrix();
        //Left Blinker
        this.scene.pushMatrix();
            this.scene.translate(0.9, 1.025, 1.65);
            this.scene.scale(0.15, 0.1, 0.1);
            this.cube.display();
        this.scene.popMatrix();

        //Template DEBUG
        this.scene.pushMatrix();
        this.scene.popMatrix();


        //Template DEBUG
        this.scene.pushMatrix();
        this.scene.popMatrix();


        //Template DEBUG
        this.scene.pushMatrix();
        this.scene.popMatrix();


        //Template DEBUG
        this.scene.pushMatrix();
        this.scene.popMatrix();
    }
};
