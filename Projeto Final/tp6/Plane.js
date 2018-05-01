
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{

	constructor(scene, nrDivs, boardWidth = 1.0, boardHeight = 1.0, textureWidth = 1.0, textureHeight = 1.0) 
	{
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;

		this.boardRatio = boardWidth / boardHeight;
		this.textureRatio = textureWidth / textureHeight;

		this.initBuffers();
	};

	initBuffers()
	{
		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)

				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15    

		*/

		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		
		var tCoord;
		var sCoord;
		var patchT;
		var patchS;

		if (this.textureRatio < this.boardRatio) {
            tCoord = 0.0;
            patchT = this.patchLength;
		}
		else {
			tCoord = -((this.textureRatio / this.boardRatio) - 1) / 2;
            patchT = (this.textureRatio / this.boardRatio) / this.nrDivs;
		}

        var yCoord = 0.5;

		for (var j = 0; j <= this.nrDivs; j++) 
		{
			if (this.textureRatio < this.boardRatio) {
                sCoord = - ((this.boardRatio / this.textureRatio) - 1) / 2;
                patchS = (this.boardRatio / this.textureRatio) / this.nrDivs;
			}
			else {
                sCoord = 0.0;
                patchS = this.patchLength;
			}
			

            var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.vertices.push(xCoord, yCoord, 0);
				
				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).
				
				this.normals.push(0,0,1);

				this.texCoords.push(sCoord, tCoord);

                xCoord += this.patchLength;
                sCoord += patchS;
			}
            yCoord -= this.patchLength;
            tCoord += patchT;
		}
		
		// Generating indices
		/* for nrDivs = 3 output will be 
			[
				 0,  4, 1,  5,  2,  6,  3,  7, 
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind=0;


		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

	/* Alternative with TRIANGLES instead of TRIANGLE_STRIP. More indices, but no degenerate triangles */
	/*
		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i < this.nrDivs; i++) 
			{
				this.indices.push(ind, ind+this.nrDivs+1, ind+1);
				this.indices.push(ind+1, ind+this.nrDivs+1, ind+this.nrDivs+2 );

				ind++;
			}
			ind++;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
	*/

		this.initGLBuffers();
	};

};