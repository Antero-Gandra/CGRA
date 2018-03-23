/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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

        var x = 0.5;
        var y = 0.0;
        var z = -0.5;
        
        for (var slice = 0; slice < this.slices; slice++) {
        	x = 0.5 * Math.cos(rad*slice);
        	y = 0.5 * Math.sin(rad*slice);
            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
        }
        for (var stack = 1; stack <= this.stacks; stack++) {
        	z += deltaZ;

        	x = 0.5;
        	y = 0;
            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
        	this.indices.push((stack - 1) * this.slices, (stack - 1) * this.slices + 1, stack * this.slices);

        	for (var slice = 1; slice < this.slices; slice++) {
        		x = 0.5 * Math.cos(rad*slice);
        		y = 0.5 * Math.sin(rad*slice);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
        		if (slice < this.slices - 1) this.indices.push(stack * this.slices + slice, (stack - 1) * this.slices + slice, (stack-1) * this.slices + slice + 1);
        		else this.indices.push(stack * this.slices + slice, (stack - 1) * this.slices + slice, (stack-1) * this.slices);
        		if (slice < this.slices - 1) this.indices.push(stack * this.slices + slice - 1, (stack - 1) * this.slices + slice, stack * this.slices + slice);
        		else {
        			this.indices.push(stack * this.slices + slice, (stack - 1) * this.slices, stack * this.slices);
        			this.indices.push(stack * this.slices + slice, stack * this.slices + slice - 1, (stack - 1) * this.slices + slice);
        		}
        	}
        	
        }

        
        //tampo z positivo
        var sideVerts = this.slices * (this.stacks + 1);
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
