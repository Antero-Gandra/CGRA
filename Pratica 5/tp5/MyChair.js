/**
 * MyChair
 * @param gl {WebGLRenderingContext }
 * @constructor
 */

class MyChair extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
    };

    display() {
        this.scene.pushMatrix();
        
        //Encosto
        this.scene.pushMatrix();
        this.scene.chairAppearance.apply();
        this.scene.translate(0, 3.75, 0.9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1.95, 0.15, 1.25);
        this.cube.display();
        this.scene.popMatrix();

        //Barras Centrais
        this.scene.pushMatrix();
        this.scene.translate(0, 2.975, 0.9);
        this.scene.scale(0.125, 1.75, 0.125);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.45, 2.975, 0.9);
        this.scene.scale(0.125, 1.75, 0.125);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.45, 2.975, 0.9);
        this.scene.scale(0.125, 1.75, 0.125);
        this.cube.display();
        this.scene.popMatrix();

        //Barras Laterais
        //this.scene.materialMetal.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.9, 2.975, 0.9);
        this.scene.scale(0.2, 1.75, 0.2);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 2.975, 0.9);
        this.scene.scale(0.2, 1.75, 0.2);
        this.cube.display();
        this.scene.popMatrix();

        //Assento
        this.scene.pushMatrix();
        this.scene.chairAppearance.apply();
        this.scene.translate(0, 2.075, 0);
        this.scene.scale(1.95, 0.15, 2.1);
        this.cube.display();
        this.scene.popMatrix();

        //Pernas
        //this.scene.materialMetal.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.9, 1, -0.9);
        this.scene.scale(0.2, 2, 0.2);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 1, 0.9);
        this.scene.scale(0.2, 2, 0.2);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.9, 1, -0.9);
        this.scene.scale(0.2, 2, 0.2);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.translate(0.9, 1, 0.9);
        this.scene.scale(0.2, 2, 0.2);
        this.cube.display();

        this.scene.popMatrix();
        this.scene.materialDefault.apply();
    }

};