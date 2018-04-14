/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject {
    constructor(scene, slices = 12, stacks = 1) {
        super(scene);
        this.tube = new MyTube(scene, slices, stacks);
        this.circle = new MyCircle(scene, slices, stacks);

        this.hourAngle = 90;
        this.minuteAngle = 180;
        this.secondAngle = 270;

        this.hourshand = new MyClockHand(scene, 0, this.hourAngle);
        this.minuteshand = new MyClockHand(scene, 1, this.minuteAngle);
        this.secondshand = new MyClockHand(scene, 2, this.secondAngle);
    };

    display() {

        //Tube
        this.scene.pushMatrix();
            this.scene.materialDefault.apply();
            this.tube.display();
        this.scene.popMatrix();

        //Tampo Z positivo
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.scene.clockAppearance.apply();
            this.circle.display();
        this.scene.popMatrix();

        this.scene.clockHandAppearance.apply();
        //Ponteiro horas
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.51);
            this.hourshand.display();
        this.scene.popMatrix();

        //Ponteiro minutos
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.51);
            this.minuteshand.display();
        this.scene.popMatrix();

        //Ponteiro segundos
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.51);
            this.secondshand.display();
        this.scene.popMatrix();

        this.scene.materialDefault.apply();
    }

    update(currTime) {
        var seconds = currTime / 1000;
        var sec = seconds % 60;
        var minutes = seconds / 60;
        var min = minutes % 60;
        var hours = minutes / 24;
        var hour = hours % 24;

        this.hourAngle = hour * 360 / 24;
        this.minuteAngle = min * 360 / 60;
        this.secondAngle = sec * 360 / 60;

        this.hourshand.setAngle(this.hourAngle);
        this.minuteshand.setAngle(this.minuteAngle);
        this.secondshand.setAngle(this.secondAngle);
    }
};