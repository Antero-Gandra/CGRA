/**
 * MyRectTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyRectTriangle extends CGFobject {
    constructor(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) {
        super(scene);
        this.initBuffers(minS, maxS, minT, maxT);
    };

    initBuffers(minS = 0, maxS = 1, minT = 0, maxT = 1) {
        this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,

            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
        ];

        this.indices = [
            0, 1, 2,
            5, 4, 3
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ]



        this.texCoords = [
            maxS, maxT,
            minS, maxT,
            maxS, minT,
            
            maxS, maxT,
            minS, maxT,
            maxS, minT
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};