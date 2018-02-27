/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [
            //x negativo
            -0.5, -0.5, -0.5,   //0
            -0.5, -0.5, 0.5,    //1
            -0.5, 0.5, 0.5,     //2
            -0.5, 0.5, -0.5,    //3
            //x positivo
            0.5, -0.5, -0.5,    //4
            0.5, -0.5, 0.5,     //5
            0.5, 0.5, 0.5,      //6
            0.5, 0.5, -0.5      //7
        ];

        this.indices = [
            //face x negativa
            0, 1, 3,
            3, 1, 2,
            //face x positiva
            4, 7, 5,
            5, 7, 6,
            //face y negativa
            5, 1, 4,
            4, 1, 0,
            //face y positiva
            6, 7, 2,
            2, 7, 3,
            //face z negativa
            4, 0, 7,
            7, 0, 3,
            //face z positiva
            5, 6, 1,
            1, 6, 2,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};
