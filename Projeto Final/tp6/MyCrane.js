/**
 * MyCrane
 * @constructor
 */

var ANIM_DURATION = 5;

var ARM_LENGHT = 10;
var FOREARM_LENGHT = 5;
var STRING_LENGHT = 3;
var ARM_ANGLE = Math.PI / 6;

class MyCrane extends CGFobject {

    constructor(scene) {
        super(scene);

        //Textura
        this.craneTexture = new CGFappearance(scene);
        this.craneTexture.setAmbient(0.8, 0.8, 0.8, 1);
        this.craneTexture.setDiffuse(0.8, 0.8, 0.8, 1);
        this.craneTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.craneTexture.setShininess(20);
        this.craneTexture.loadTexture("../resources/images/crane.jpg");
        this.craneTexture.setTextureWrap("REPEAT", "REPEAT");

        //Constituido por 6 cilindros
        this.base = new MyCylinder(scene, 32, 4);
        this.arm = new MyCylinder(scene, 8, 4);
        this.articulation = new MyCylinder(scene, 32, 4);
        this.forearm = new MyCylinder(scene, 8, 4);
        this.string = new MyCylinder(scene, 4, 4);
        this.hand = new MyCylinder(scene, 32, 4);

        //Base
        this.baseAngle = Math.PI / 4;
        this.minBaseAngle = 0;
        this.maxBaseAngle = 180;

        //ARTICULATION
        this.articulationAngle = Math.PI / 4;
        this.minArticulationAngle = 0;
        this.maxArticulationAngle = 90;

        //Maquina de Estados
        this.stage = 0;
        this.articulationRotation = 1;
        this.startTime = 0;

    }

    update(currTime) {
        var deltaTime = currTime - this.lastTime;
        deltaTime *= 0.001;

        this.lastTime = currTime;

        if (deltaTime <= ANIM_DURATION) {
            this.articulationRotation = 11.5 * deltaTime / ANIM_DURATION;
            this.animationSpeed = currTime / (1000 / 5);

        }
    }

    display() {
        this.craneTexture.apply();

        //base of crane
        this.scene.pushMatrix();
            this.scene.scale(2, 1, 2);
            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.base.display();
        this.scene.popMatrix();
        
        
        //arm
        this.scene.rotate(this.baseAngle, 0, 1, 0);        
        this.scene.rotate(ARM_ANGLE, 0, 0, 1);

        this.scene.pushMatrix();
            this.scene.scale(0.8, ARM_LENGHT, 0.8);
            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.arm.display();
        this.scene.popMatrix();

        
        //articulation
        this.scene.pushMatrix();
            this.scene.translate(0, ARM_LENGHT, 0);
            this.scene.rotate(this.articulationAngle, 0, 0, 1);
            this.articulation.display();


            //forearm & magnet
            this.scene.pushMatrix();
                        
                //string
                this.scene.pushMatrix();
                    this.scene.translate(0, FOREARM_LENGHT, 0);
                    this.scene.rotate(-ARM_ANGLE - this.articulationAngle, 0, 0, 1);

                    //magnet
                    this.scene.pushMatrix();
                        this.scene.translate(0, -STRING_LENGHT, 0);
                        this.scene.scale(2.5, 1, 2.5);
                        this.scene.translate(0, -0.5, 0);
                        this.scene.rotate(Math.PI / 2, 1, 0, 0);
                        this.hand.display();
                    this.scene.popMatrix();

                    this.scene.scale(0.2, STRING_LENGHT, 0.2);
                    this.scene.translate(0, -0.5, 0);
                    this.scene.rotate(Math.PI / 2, 1, 0, 0);
                    this.string.display();
                this.scene.popMatrix();
                
                //forearm
                this.scene.scale(0.8, FOREARM_LENGHT, 0.8);
                this.scene.translate(0, 0.5, 0);
                this.scene.rotate(Math.PI / 2, 1, 0, 0);
                this.arm.display();
            this.scene.popMatrix();


        this.scene.popMatrix();
    };

    //restos da maquina de estados
    // getCurrentState() {
    //     return this.state;
    // }

    // setState(state) {
    //     this.state = state;
    // }

    //outra tentativa de implementar a rotação
    // setRotation(clockwise) {
    //     if (clockwise) {
    //         this.craneOrientation += ROTATION;
    //     } else {
    //         this.craneOrientation -= ROTATION;
    //     }
    // }
    // rotate(){
    //     if(this.craneOrientation == 0.5){
    //     } else if(this.craneOrientation == 0) {
    //     }
    // }

}