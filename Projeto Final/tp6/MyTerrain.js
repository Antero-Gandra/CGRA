// 2. Ambiente Inicial

class MyTerrain extends Plane {

    constructor(scene, nrDivs, altimetry, texture = null, repeatTexture = false, textureWidthReps = 1.0, textureHeightReps = 1.0) {
        super(scene, nrDivs);

        this.altimetry = altimetry;
        this.texture = texture;
        this.textureRepeat = repeatTexture;
        this.texWidthReps = textureWidthReps;
        this.texHeightReps = textureHeightReps;

        this.correctVertex();
        //this.correctTextures();
    }

    correctVertex() {
        for (var i = 0; i * 3 < this.vertices.length; i++) {
            console.log(Math.floor(i / (this.nrDivs + 1)));
            console.log(Math.floor(i % (this.nrDivs + 1)));
            this.vertices[i*3 + 2] = this.altimetry[Math.floor(i / (this.nrDivs + 1))][Math.floor(i % (this.nrDivs + 1))] * this.patchLength;
            console.log(this.vertices[i*3 + 2]);
            console.log("------");
        }
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    };

    correctTextures() {
        for (var i = 1; i * 2 < this.texCoords.length; i++) {
            if (i % (this.nrDivs + 1) < 1) continue;
            var distS = 1;
            var distT = 1;
            this.texCoords[i*2] = 1;
            this.texCoords[i*2 + 1] = 1;
        }
    };
    
    display() {
      //this.texture.apply();
      super.display();  
    };

}