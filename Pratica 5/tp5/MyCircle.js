/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [];

        this.indices = [];

        this.normals = [];

        this.texCoords = [];

        var ang = 360 / this.slices;
        var rad = ang * Math.PI / 180;
        
        this.vertices.push(0.0, 0.0, 0.0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);
        this.vertices.push(0.5, 0.0, 0.0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(1, 0.5);
        var i = 1;
        for (i = 1; i < this.slices; i++) {
            this.vertices.push(0.5 * Math.cos(i * rad), 0.5 * Math.sin(i * rad), 0.0);
            this.normals.push(0, 0, 1);
            this.indices.push(0, i, i + 1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(i * rad), 0.5 - 0.5 * Math.sin(i * rad));
        }
        this.indices.push(0, i, 1);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};
