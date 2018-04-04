/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
{
	constructor(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);
		this.initBuffers(minS, maxS, minT, maxT);
		//DEBUG
        console.log(maxS);
        console.log(minS);
        console.log(maxT);
        console.log(minT);
	};

	initBuffers(minS = 0, maxS = 1, minT = 0, maxT = 1) 
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
				maxS, minT,
				minS, minT
        ]

		//this.texCoords = [
		//		1.0, 1.0,
		//		0.0, 1.0,
		//		0.0, 0.0,
		//		1.0, 0.0
		//]
					
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };
};
