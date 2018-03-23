/**
 * MyLamp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
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
        var deltaZ = Math.PI / (2*this.stacks);

        var x = 0.5;
        var y = 0.0;
        var z = 0;
        
        for (var slice = 0; slice < this.slices; slice++) {
        	x = 0.5 * Math.cos(rad*slice);
        	y = 0.5 * Math.sin(rad*slice);
            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
        }
        for (var stack = 1; stack <= this.stacks; stack++) {
        	z = 0.5*Math.sin(stack*deltaZ);

        	x = 0.5 * Math.cos(rad*slice) * Math.cos(stack * deltaZ);
        	y = 0.5 * Math.sin(rad*slice) * Math.cos(stack * deltaZ);
            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
        	this.indices.push((stack - 1) * this.slices, (stack - 1) * this.slices + 1, stack * this.slices);

            for (var slice = 1; slice < this.slices; slice++) {
                x = 0.5 * Math.cos(rad * slice) * Math.cos(stack * deltaZ);
                y = 0.5 * Math.sin(rad * slice) * Math.cos(stack * deltaZ);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
        		if (slice < this.slices - 1) this.indices.push(stack * this.slices + slice, (stack - 1) * this.slices + slice, (stack-1) * this.slices + slice + 1);
        		else this.indices.push(stack * this.slices + slice, (stack - 1) * this.slices + slice, (stack-1) * this.slices);
        		if (slice < this.slices - 1) this.indices.push(stack * this.slices + slice - 1, (stack - 1) * this.slices + slice, stack * this.slices + slice);
        		else {
        			this.indices.push(stack * this.slices + slice, (stack - 1) * this.slices, stack * this.slices);
        			this.indices.push(stack * this.slices + slice, stack * this.slices + slice - 1, (stack - 1) * this.slices + slice);
        		}
        	}
        	
        }

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };
};
