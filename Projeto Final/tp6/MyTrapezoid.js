/**
 * MyTrapezoid
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezoid extends CGFobject {
    constructor(scene, h = 1, coord1 = 0, coord2 = 0, coord3 = 0, coord4 = 0, minS = 0, maxS = 1, minT = 0, maxT = 1) {
        super(scene);
        this.initBuffers(h, coord1, coord2, coord3, coord4, minS, maxS, minT, maxT);
    };

    initBuffers(h, coord1, coord2, coord3, coord4, minS, maxS, minT, maxT) {

        /*  Poss�veis trapezios:
         *
         *          coord3---------------coord4                         coord3-------------------4--coord4
         *          /|           ^          |\                             |            ^        |     /
         *         / |           |          | \                            |            |        |    /
         *        /  |           h          |  \                           |            h        |   /
         *       /   |           |          |   \                          |            |        |  /
         *      /    |           v          |    \                         |            v        | /
         *    coord1-1----------------------2--coord2                   coord1---------------coord2
         */

        var y = h / 2;

        this.vertices = [
            -0.5 + coord1, -y, 0,
            0.5 + coord2, -y, 0,
            -0.5 + coord3, y, 0,
            0.5 + coord4, y, 0
        ];

        this.indices = [
            0, 1, 2,
            3, 2, 1,
            1, 0, 2,
            2, 3, 1
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ]

        this.texCoords = [
            maxS, maxT,
            minS, maxT,
            maxS, minT,
            minS, minT
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};
