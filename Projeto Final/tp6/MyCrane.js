/**
 * MyCrane
 * @constructor
 */

var ANIM_DURATION = 5;

class MyCrane extends CGFobject {

    constructor(scene, x, y, z, rotation) {
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
        this.arm = new MyCylinder(scene, 32, 4);
        this.articulation = new MyCylinder(scene, 32, 4);
        this.forearm = new MyCylinder(scene, 32, 4);
        this.string = new MyCylinder(scene, 32, 4);
        this.hand = new MyCylinder(scene, 32, 4);

        //Posição Inicial da grua
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation;

        //Base
        this.baseAngle = 0;
        this.minBaseAngle = 0;
        this.maxBaseAngle = 90;

        //ARTICULATION
        this.articulationAngle = 0;
        this.minArticulationAngle = 0;
        this.maxArticulationAngle = 45;

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

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);


        //base da crane


        this.scene.pushMatrix();
        this.scene.scale(2.5, 1.5, 2.5)
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.craneTexture.apply();
        this.base.display();
        this.scene.popMatrix();

        //testar se base faz rodar corretamente: roda!
        this.scene.pushMatrix();
        this.scene.rotate(this.articulationRotation, 0, 1, 0);

        //arm
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 8, 0, 0, 1)
        this.scene.scale(1, 11, 1);
        this.scene.translate(0, 0.55, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.arm.display();
        this.scene.popMatrix();


        //this.scene.pushMatrix();
        //a articulação não roda corretamente
        //this.scene.rotate(Math.PI / 2, 0, 1, 0);

        //articulation
        this.scene.pushMatrix();
        this.scene.translate(-4.5, 10.9, 0);
        this.scene.scale(1, 1, 1.5);
        this.articulation.display();
        this.scene.popMatrix();

        //forearm
        this.scene.pushMatrix();
        this.scene.translate(-6, 7.7, 0);
        this.scene.rotate(-Math.PI / 8, 0, 0, 1)
        this.scene.scale(1, 7, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.arm.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        //string
        this.scene.pushMatrix();
        this.scene.scale(0.2, 3, 0.2)
        this.scene.translate(36, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.string.display();
        this.scene.popMatrix();

        //hand
        this.scene.pushMatrix();
        this.scene.scale(2.5, 1.5, 2.5)
        this.scene.translate(2.9, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.hand.display();
        this.scene.popMatrix();

        //this.scene.popMatrix();
        //this.scene.popMatrix();
        this.scene.popMatrix();
    };

    getX() {
        return this.x;
    }

    getZ() {
        return this.z;
    }

    getRotation() {
        return this.rotation;
    }

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