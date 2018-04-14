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

        var x = 0.5;
        var y = 0.0;
        var z = -0.5;

        for (var slice = 0; slice <= this.slices; slice++) {
            x = 0.5 * Math.cos(rad * slice);
            y = 0.5 * Math.sin(rad * slice);
            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
            this.texCoords.push(slice * deltaS, 0);
        }
        for (var stack = 1; stack <= this.stacks; stack++) {
            z += deltaZ;

            x = 0.5;
            y = 0;
            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
            this.indices.push((stack - 1) * (this.slices + 1), (stack - 1) * (this.slices + 1) + 1, stack * (this.slices + 1));
            this.texCoords.push(0, stack * deltaT);

            for (var slice = 1; slice <= this.slices; slice++) {
                x = 0.5 * Math.cos(rad * slice);
                y = 0.5 * Math.sin(rad * slice);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
                if (slice < (this.slices + 1) - 1) this.indices.push(stack * (this.slices + 1) + slice, (stack - 1) * (this.slices + 1) + slice, (stack - 1) * (this.slices + 1) + slice + 1);
                else this.indices.push(stack * (this.slices + 1) + slice, (stack - 1) * (this.slices + 1) + slice, (stack - 1) * (this.slices + 1));
                if (slice < (this.slices + 1) - 1) this.indices.push(stack * (this.slices + 1) + slice - 1, (stack - 1) * (this.slices + 1) + slice, stack * (this.slices + 1) + slice);
                else {
                    this.indices.push(stack * (this.slices + 1) + slice, (stack - 1) * (this.slices + 1), stack * (this.slices + 1));
                    this.indices.push(stack * (this.slices + 1) + slice, stack * (this.slices + 1) + slice - 1, (stack - 1) * (this.slices + 1) + slice);
                }

                //if (slice + 1 != this.slices) this.texCoords.push(slice*deltaS, stack*deltaT);
                //else this.texCoords.push(0, stack*deltaT);
                this.texCoords.push(slice * deltaS, stack * deltaT);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};
