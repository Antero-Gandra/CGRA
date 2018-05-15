// 2. Ambiente Inicial

class MyTire extends MyCylinder {

    constructor(scene, slices, stacks, textureTube = scene.materialDefault, textureCircle = scene.materialDefault) {
        super(scene, slices, stacks);

        this.texTube = textureTube;
        this.texCirc = textureCircle;
        
        if (this.texTube != undefined)
            console.log("texTube defined");
        if (this.texTube == scene.materialDefault) console.log("Material default");
        else if (this.texTube == scene.tireSideAppearance) console.log("tire correct");
        else console.log("Not materialDefault");
    }

    display() {
        //Tubo
        this.texTube.apply();
        this.scene.pushMatrix();
            this.tube.display();
        this.scene.popMatrix();

        this.texCirc.apply();
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

}