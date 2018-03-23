/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT) 
	{
		super(scene);
		this.initBuffers(minS, maxS, minT, maxT);
	};

	initBuffers(minS, maxS, minT, maxT) 
	{
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

		this.texCoords = [
				maxS, maxT,
				minS, maxT,
				minS, minT,
				maxS, minT
		]

		/*this.texCoords = [
				1.0, 1.0,
				0.0, 1.0,
				0.0, 0.0,
				1.0, 0.0
		]*/
					
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };
};
