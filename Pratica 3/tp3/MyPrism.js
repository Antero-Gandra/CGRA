/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene,slices,stacks) 
	{
		super(scene);
		this.slices=slices;
		this.stacks=stacks;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [];

		this.indices = [];
			
        this.normals = [];

		var ang= 360/this.slices;
		var rad= ang*Math.PI /180;

        //prisma com eixo z no centro; ponto inicial (0.5, 0, -0.5)
        var deltaZ = 1 / this.stacks;

        for (var side = 0; side < this.slices; side++) {
            var xNorm = 0.5 * Math.cos(side * rad + rad / 2);
            var yNorm = 0.5 * Math.sin(side * rad + rad / 2);

            var xInf = 0.5 * Math.cos(side * rad);
            var xSup = 0.5 * Math.cos((side + 1) * rad);
            var yInf = 0.5 * Math.sin(side * rad);
            var ySup = 0.5 * Math.sin((side + 1) * rad);

            this.vertices.push(xInf, yInf, -0.5);
            this.vertices.push(xSup, ySup, -0.5);
            this.normals.push(xNorm, yNorm, 0);
            this.normals.push(xNorm, yNorm, 0);
            for (var i = 1; i <= this.stacks; i++) {
                this.vertices.push(xInf, yInf, i * deltaZ - 0.5);
                this.vertices.push(xSup, ySup, i * deltaZ - 0.5);
                this.normals.push(xNorm, yNorm, 0);
                this.normals.push(xNorm, yNorm, 0);
                this.indices.push(side * (this.stacks * 2 + 2) + 2 * i - 2, side * (this.stacks * 2 + 2) + 2 * i - 1, side * (this.stacks * 2 + 2) + 2 * i);
                this.indices.push(side * (this.stacks * 2 + 2) + 2 * i, side * (this.stacks * 2 + 2) + 2 * i - 1, side * (this.stacks * 2 + 2) + 2 * i + 1);
            }
        }

        //tampo z positivo
        var sideVerts = this.slices * (this.stacks * 2 + 2);
        this.vertices.push(0.0, 0.0, 0.5);
        this.normals.push(0, 0, 1);
        this.vertices.push(0.5, 0.0, 0.5);
        this.normals.push(0, 0, 1);
        var i = 1;
        for (i = 1; i < this.slices; i++) {
            this.vertices.push(0.5 * Math.cos(i * rad), 0.5 * Math.sin(i * rad), 0.5);
            this.normals.push(0, 0, 1);
            this.indices.push(sideVerts, sideVerts + i, sideVerts + i + 1);
        }
        this.indices.push(sideVerts, sideVerts + i, sideVerts + 1);


        //tampo z negativo
        sideVerts += this.slices + 1;
        this.vertices.push(0.0, 0.0, -0.5);
        this.normals.push(0, 0, -1);
        this.vertices.push(0.5, 0.0, -0.5);
        this.normals.push(0, 0, -1);
        var i = 1;
        for (i = 1; i < this.slices; i++) {
            this.vertices.push(0.5 * Math.cos(i * rad), 0.5 * Math.sin(i * rad), -0.5);
            this.normals.push(0, 0, -1);
            this.indices.push(sideVerts + 1 + i, sideVerts + i, sideVerts);
        }
        this.indices.push(sideVerts + 1, sideVerts + i, sideVerts);

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };
};
