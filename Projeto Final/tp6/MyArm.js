/**
 * MyArm
 * @constructor
 */

class MyArm extends CGFobject {

    constructor(scene,depositPoint, pickupPoint) {
        super(scene);
        this.articulation = new MyCylinder(scene, 32, 4);
        this.forearm =  new MyCylinder(scene, 32, 4);
        this.string =  new MyCylinder(scene, 32, 4);
        this.hand =  new MyCylinder(scene, 32, 4);
    
    }

    //6 cilindros

    display() {
      
        this.scene.pushMatrix();
  

    
    //articulation
         this.scene.pushMatrix();
         this.scene.translate(-4.5, 10.9, 0);
         this.scene.scale(1,1,1.5);
         this.articulation.display();
         this.scene.popMatrix();
 
     //forearm
      this.scene.pushMatrix();
      this.scene.translate(-6, 7.7, 0);
      this.scene.rotate(-Math.PI/8,0,0,1)
      this.scene.scale(1,7,1);
      this.scene.rotate(Math.PI/2,1,0,0)
      this.forearm.display();
      this.scene.popMatrix();
      this.scene.popMatrix();
     
      //string
      this.scene.pushMatrix();
      this.scene.scale(0.2,3,0.2)
      this.scene.translate(-36, 1, 0);
      this.scene.rotate(Math.PI/2,1,0,0)
      this.string.display();
      this.scene.popMatrix();
      
      //hand
      this.scene.pushMatrix();
      this.scene.scale(2.5,1.5,2.5)
      this.scene.translate(-2.9, 0.5, 0);
      this.scene.rotate(Math.PI/2,1,0,0)
      this.hand.display();
      this.scene.popMatrix();

     this.scene.popMatrix();
        
    };


    



}