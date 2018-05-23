/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene,slices,stacks)    
	{
        super(scene);
        this.tube = new MyTube(scene, slices, stacks);
        this.circle = new MyCircle(scene, slices);
	};

    display() {

        //Tubo
        this.scene.pushMatrix();
        this.tube.display();
        this.scene.popMatrix();

        //Tampo de z positivo
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.circle.display();
        this.scene.popMatrix();

        //Tampo de z negativo
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.circle.display();
        this.scene.popMatrix();
    }
};
