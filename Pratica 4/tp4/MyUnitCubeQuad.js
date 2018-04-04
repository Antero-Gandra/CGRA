/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject {
    constructor(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) {
        super(scene);
        this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);
    };

    display() {
        this.scene.pushMatrix();

        //this.scene.translate(1, 1, 1);
        //this.scene.rotate(Math.PI/2, 0, 1, 0);

        //z positivo
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5); 
            this.quad.display();
        this.scene.popMatrix();

        //rotacoes em torno de y
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(3*Math.PI / 2, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
        this.scene.popMatrix();

        //os dois y
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);   
            this.quad.display();
        this.scene.popMatrix();

            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();

        this.scene.popMatrix();
    }

    
};