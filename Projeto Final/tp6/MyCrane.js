/**
 * MyCrane
 * @constructor
 */

var ANIM_DURATION = 5;

var ARM_LENGHT = 10;
var FOREARM_LENGHT = 5;
var STRING_LENGHT = 3;

var ARM_ANGLE = Math.PI / 6;

var SPEED = 1;

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
        this.baseAngle = Math.PI / 3;
        this.baseAngleD = Math.PI / 3;
        this.baseAngleR = 5*Math.PI / 6;

        //ARTICULATION
        this.articulationAngle = Math.PI / 3;
        this.articulationAngleUp = Math.PI / 3;
        this.articulationAngleDown = 1.61*Math.PI/3;

        //Auxiliary flags
        this.isFetching = false;
        
        this.articulationUp = true;

        this.baseAtD = true;
        this.hasCar = false;
        this.carDrop = 0;
        this.carDropped = 3;

        this.carX = 0;
        this.carZ = 0;
        this.carAngle = 0;

        this.baseAtR = false;

        this.atR = false;
        this.atD = true;
    }

    fetch(value) {
        this.isFetching = value;
    }

    update(currTime) {
        var deltaTime = currTime - this.lastTime;
        deltaTime *= 0.001;
        this.lastTime = currTime;

        if (this.isFetching && !this.hasCar) {
            this.goToR(deltaTime);
        }
        else this.goToD(deltaTime);
    }

    moveTo(inic, fim, deltaTime, speed = SPEED) {
        if (inic == fim) return fim;
        var deltaS = fim-inic;
        var newS = inic + Math.sign(deltaS) * speed * deltaTime;
        if (Math.abs(deltaS) < Math.abs(newS - inic)) {
            return fim
        }
        else return newS;
    }

    goToR(deltaTime) {
        if (this.baseAtR) {
            this.articulationAngle = this.moveTo(this.articulationAngle, this.articulationAngleDown, deltaTime);
            this.articulationUp = false;
            if (this.articulationAngle == this.articulationAngleDown) {
                this.hasCar = true;

                this.carX = this.scene.jeep.xCoord;
                this.scene.jeep.xCoord = 0;
                this.carZ = this.scene.jeep.zCoord;
                this.scene.jeep.zCoord = 0;
                this.carAngle = this.scene.jeep.angle;
                this.scene.jeep.angle += 7*Math.PI/6;
            }
        }
        else {
            this.baseAngle = this.moveTo(this.baseAngle, this.baseAngleR, deltaTime);
            if (this.baseAngle == this.baseAngleR) this.baseAtR = true;
            this.baseAtD = false;
        }
    }

    goToD(deltaTime) {
        if (!this.articulationUp) {
            this.articulationAngle = this.moveTo(this.articulationAngle, this.articulationAngleUp, deltaTime);
            if (this.articulationAngle == this.articulationAngleUp) this.articulationUp = true;
        }
        else if (!this.baseAtD) {
            this.baseAngle = this.moveTo(this.baseAngle, this.baseAngleD, deltaTime);
            if (this.baseAngle == this.baseAngleD) this.baseAtD = true;
            this.baseAtR = false;
        }
        else if (this.hasCar) {
            this.carDrop = moveTo(this.carDrop, this.carDropped, deltaTime);
            if (this.carDrop == this.carDropped) {
                this.hasCar = false;
                this.scene.jeep.xCoord = this.carX - 10;
                this.scene.jeep.zCoord = this.carZ + 2;
                this.scene.jeep.angle = this.carAngle - (5*Math.PI/6 - Math.PI/3);
            }
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

                    //car 
                    console.log(this.hasCar + "   " + this.carDrop);
                    if (this.hasCar) {
                        this.scene.pushMatrix();
                            this.scene.translate(0, -STRING_LENGHT - 2.65 - this.carDrop, 0);
                            this.scene.jeep.display();
                        this.scene.popMatrix();
                    }

                    this.craneTexture.apply();

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