/**
 * MyTable
 * @param gl {WebGLRenderingContext }
 * @constructor
 */

class MyTable extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
    };

    display() {
        this.scene.pushMatrix();

        this.scene.pushMatrix();

        //Tampo
        this.scene.materialWood.apply();
        this.scene.translate(0, 3.65, 0);
        this.scene.scale(5, 0.3, 3);
        this.cube.display();
        this.scene.popMatrix();

        //Pernas
        this.scene.materialMetal.apply();
        this.scene.pushMatrix();
        this.scene.translate(-2.25, 1.75, -1.25);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.25, 1.75, 1.25);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.25, 1.75, -1.25);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();
        
        this.scene.translate(2.25, 1.75, 1.25);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();

        this.scene.popMatrix();
        this.scene.materialDefault.apply();
    }

};