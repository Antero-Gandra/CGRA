/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext }
 * @constructor
 */

var ANIM_DURATION = 2;

class MyPaperPlane extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyRectTriangle(this.scene);
        this.stage = 0;
        this.startTime = 0;

        this.ani1PosZ = 0;
        this.ani1PosY = 0;
        this.ani1RotX = - Math.PI / 6;
    };

    display() {
        
        //Asa 1
        this.scene.pushMatrix();
        this.scene.translate(0, this.ani1PosY, this.ani1PosZ);
        this.scene.rotate(this.ani1RotX, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1, 1);
        this.scene.translate(0.5, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        //Asa 2
        this.scene.pushMatrix();
        this.scene.translate(0, this.ani1PosY, this.ani1PosZ);
        this.scene.rotate(this.ani1RotX, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(-0.4, 1, -1);
        this.scene.translate(0.5, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        //Corpo
        this.scene.pushMatrix();
        this.scene.translate(0, this.ani1PosY, this.ani1PosZ);
        this.scene.rotate(this.ani1RotX, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.2, 1, 1);
        this.scene.translate(0.5, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }

    update(currTime) {
        var deltaTime = (currTime - this.startTime) / 1000;

        switch (this.stage) {
            case 0:
                this.startTime = currTime;
                this.stage = 1;
                break;
            case 1:
                if (deltaTime <= ANIM_DURATION) {
                    this.ani1PosZ = 11.5 * deltaTime / ANIM_DURATION;
                    this.ani1PosY = 1.5 * deltaTime / ANIM_DURATION;
                } else {
                    this.stage = 2;
                    this.startTime = currTime;
                    this.ani1RotX = Math.PI / 2;
                }
                break;
            case 2:
                if (deltaTime * 2 <= ANIM_DURATION) {
                    this.ani1PosZ = 11.5;
                    this.ani1PosY = 1.5 - (5 * deltaTime * 2 / ANIM_DURATION);
                } else {
                    this.stage = 3;
                    this.ani1PosY = -3.8;
                    this.ani1RotX = 0.19739556;
                }
                break;
            default:
                break;
        }
    }
};