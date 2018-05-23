/**
 * MyCrane
 * @constructor
 */
var ROTATION = 0.5;

class MyCrane extends CGFobject {



    constructor(scene,depositPoint, pickupPoint) {
        super(scene);
        this.base = new MyCylinder(scene, 32, 4);
        this.arm = new MyCylinder(scene, 32, 4);
        this.forearm = new MyArm(scene,0,0);
        this.craneOrientation = 0;
    }

    //6 cilindros

    display() {
      
        this.scene.pushMatrix();
        //this.scene.rotate(this.craneOrientation,0,1,0);


      //base da crane
      this.scene.pushMatrix();
     this.scene.rotate(Math.PI,0,1,0);

        this.scene.pushMatrix();
        this.scene.scale(2.5,1.5,2.5)
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2,1,0,0)
        this.base.display();
        this.scene.popMatrix();

     //arm
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8,0,0,1)
        this.scene.scale(1,11,1);
        this.scene.translate(0, 0.55, 0);
        this.scene.rotate(Math.PI/2,1,0,0)
        this.arm.display();
        this.scene.popMatrix();
    

      //arm2

      this.scene.pushMatrix();
      this.forearm.display();
      this.scene.popMatrix();
        // //articulation
        //    this.scene.pushMatrix();
        //    this.scene.translate(-4.5, 10.9, 0);
        //    this.scene.scale(1,1,1.5);
        //    this.articulation.display();
        //    this.scene.popMatrix();
   
        // //forearm
        // this.scene.pushMatrix();
        // this.scene.translate(-6, 7.7, 0);
        // this.scene.rotate(-Math.PI/8,0,0,1)
        // this.scene.scale(1,7,1);
        // this.scene.rotate(Math.PI/2,1,0,0)
        // this.arm.display();
        // this.scene.popMatrix();
        // this.scene.popMatrix();
        // //cabo
        // this.scene.pushMatrix();
        // this.scene.scale(0.2,3,0.2)
        // this.scene.translate(36, 1, 0);
        // this.scene.rotate(Math.PI/2,1,0,0)
        // this.string.display();
        // this.scene.popMatrix();
        
        // //hand
        // this.scene.pushMatrix();
        // this.scene.scale(2.5,1.5,2.5)
        // this.scene.translate(2.9, 0.5, 0);
        // this.scene.rotate(Math.PI/2,1,0,0)
        // this.hand.display();
        // this.scene.popMatrix();


    // this.scene.popMatrix();
        
    };


    setRotation(clockwise) {
        if (clockwise) {
            this.craneOrientation += ROTATION;
        } else {
            this.craneOrientation -= ROTATION;
        }
    }
    



}