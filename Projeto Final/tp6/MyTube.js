/**
 * MyTube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTube extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [];

        this.indices = [];

        this.normals = [];

        this.texCoords = [];

        var ang = 360 / this.slices;
        var rad = ang * Math.PI / 180;

        //prisma com eixo z no centro; ponto inicial (0.5, 0, -0.5)
        var deltaZ = 1 / this.stacks;
        var deltaS = 1 / this.slices;
        var deltaT = 1 / this.stacks;

        var x, y, z;

        var s = 0, t = 0;
        

        for (var stack = 0; stack <= this.stacks; stack++) {

            z = stack * deltaZ - 0.5;

            s = 0;

            for (var slice = 0; slice <= this.slices; slice++) {

                x = 0.5 * Math.cos(rad * slice);
                y = 0.5 * Math.sin(rad * slice);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
                this.texCoords.push(s, t);

                // na ultima iteracao nao se acrescentam indices
                if (stack != this.stacks) {

                    var thisStack = stack * (this.slices + 1) + slice;
                    var nextStack = (stack + 1) * (this.slices + 1) + slice;

                    if (slice != this.slices) {
                        this.indices.push(thisStack + 1, nextStack, thisStack);
                        this.indices.push(nextStack + 1, nextStack, thisStack + 1);
                    }
                }

                s += deltaS;
            }

            t += deltaT;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};
