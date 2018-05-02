/**
 * MyHalfSphere
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyHalfSphere extends CGFobject
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

        this.texCoords = [];

		var ang= 360/this.slices;
		var rad= ang*Math.PI /180;
        
        var deltaZ = Math.PI / (2 * this.stacks);

        var deltaS = 1 / this.slices;
        var deltaT = 1 / this.stacks;

        var x, y, z;

        var s = 0, t = 0;

        for (var stack = 0; stack <= this.stacks; stack++) {

            s = 0;

            for (var slice = 0; slice <= this.slices; slice++) {
                x = 0.5 * Math.cos(rad * slice) * Math.cos(deltaZ * stack);
                y = 0.5 * Math.sin(rad * slice) * Math.cos(deltaZ * stack);
                z = 0.5 * Math.sin(deltaZ * stack);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(s, t);

                //na ultima iteracao nao se acrescentam indices
                if (stack != this.stacks) {

                    var this_stack = stack * (this.slices + 1) + slice;
                    var next_stack = (stack + 1) * (this.slices + 1) + slice;

                    if (slice != this.slices) {

                        this.indices.push(this_stack + 1, next_stack, this_stack);
                        this.indices.push(next_stack + 1, next_stack, this_stack + 1);
                    }
                }

                s += deltaS;
            }

            t += deltaT;
        }

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };
};
