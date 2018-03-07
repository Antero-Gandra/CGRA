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
		var ang= 360/this.slices;
		var rad= 60*Math.PI /100;
		//var sin= Math.sin(ang);
		//var cos=Math.cos(ang);

		for(var i=0;i< this.slices;i++)
		{
			//4 vertices
			this.vertices.push(Math.COS,y,z);
			this.vertices.push(x,y,z);
			this.vertices.push(x,y,z);
			this.vertices.push(x,y,z);
			//4 normais
			this.normals.push(0,0,1); //o mesmo porque estão na mesma face
			this.normals.push(0,0,1);
			this.normals.push(0,0,1);
			this.normals.push(0,0,1);
			//6 indices
			this.indices.push();
			this.indices.push();
			this.indices.push();
			this.indices.push();
			this.indices.push();
			this.indices.push();

		}
		this.vertices = [
				-0.5, -0.5, 0,
				0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0
				];

		this.indices = [
				0, 1, 2, 
				3, 2, 1
			];
			
		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
		]
					
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };
};
