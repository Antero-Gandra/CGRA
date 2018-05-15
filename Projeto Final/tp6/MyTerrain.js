// 2. Ambiente Inicial

class MyTerrain extends Plane {

    constructor(scene, nrDivs, altimetry, texture = scene.materialDefault, textureWidthReps = 1.0, textureHeightReps = 1.0) {
        super(scene, nrDivs);
        
        this.altimetry = altimetry;
        this.texture = texture;
        this.texWidthReps = textureWidthReps;
        this.texHeightReps = textureHeightReps;

        this.correctVertex();
        this.correctTextures();
    }

    correctVertex() {
        for (var i = 0; i * 3 < this.vertices.length; i++) {
            this.vertices[i*3 + 2] = this.altimetry[Math.floor(i / (this.nrDivs + 1))][Math.floor(i % (this.nrDivs + 1))] * this.patchLength;
        }
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    };

    correctTextures() {
        var tCoord = 0.0;
        var sCoord = 0.0;
        var patchT = this.patchLength * this.texHeightReps;
        var patchS = this.patchLength * this.texWidthReps;

        for (var j = 0; j <= this.nrDivs; j++) {
            sCoord = 0.0;

            for (var i = 0; i <= this.nrDivs; i++) {
                this.texCoords[2 * (j * (this.nrDivs + 1) + i)] = sCoord;
                this.texCoords[2 * (j * (this.nrDivs + 1) + i) + 1] = tCoord;

                sCoord += patchS;
            }

            tCoord += patchT;
        }

        /*

        // TODO: EU TENTEI POR TUDO POR ISTO A FUNCIONAR COMO DEVE SER, 
        // COM AS MAIS REPETICOES NAS INCLINACOES PARA QUE A TEXTURA NAO ESTICASSE NOS DECLIVES, 
        // MAS NUNCA CONSEGUI E JA GASTEI DEMASIADAS HORAS (6+) SÓ NISTO... DESISTO.


        console.log(patchS + "   " + patchT + "   " + this.texCoords.length);

        var texCoordsLength = this.texCoords.length;
        for (var i = 1; i * 2 < texCoordsLength; i++) {
            //first coords stay the same
            if (i / (this.nrDivs+1) < 1) {  //first line, no t change
                var sDelta = Math.sqrt(Math.pow(Math.abs(this.altimetry[Math.floor(i / (this.nrDivs + 1))][i % (this.nrDivs + 1)] - this.altimetry[Math.floor(i / (this.nrDivs + 1))][i % (this.nrDivs + 1) - 1]), 2) + 1);
                sCoord = patchS * sDelta;
                this.texCoords[2*i] = this.texCoords[2*(i-1)] + sCoord;

                //DEBUG
                console.log ("j: " + Math.floor(i/(this.nrDivs+1)) + " i: " + i%(this.nrDivs+1) + "    S: " + this.texCoords[2*i] + "   T: " + this.texCoords[2*i + 1] + "    sZDelta: " + sCoord + "    tZDelta: " + tCoord);
            }
            else if (i % (this.nrDivs+1) == 0) {   //fisrt column, no s change
                var tDelta = Math.sqrt(Math.pow(Math.abs(this.altimetry[Math.floor(i / (this.nrDivs + 1))][i % (this.nrDivs + 1)] - this.altimetry[Math.floor(i / (this.nrDivs + 1) - 1)][i % (this.nrDivs + 1)]), 2) + 1);
                tCoord = patchT * tDelta;
                this.texCoords[2*i + 1] = this.texCoords[2*(i-this.nrDivs-1) + 1] + tCoord;

                //DEBUG
                console.log ("j: " + Math.floor(i/(this.nrDivs+1)) + " i: " + i%(this.nrDivs+1) + "    S: " + this.texCoords[2*i] + "   T: " + this.texCoords[2*i + 1] + "    sZDelta: " + sCoord + "    tZDelta: " + tCoord);
            }
            else {
                var sDelta = Math.sqrt(Math.pow(Math.abs(this.altimetry[Math.floor(i / (this.nrDivs + 1))][i % (this.nrDivs + 1)] - this.altimetry[Math.floor(i / (this.nrDivs + 1))][i % (this.nrDivs + 1) - 1]), 2) + 1);
                sCoord = patchS * sDelta;
                this.texCoords[2*i] = this.texCoords[2*(i-1)] + sCoord;
                
                var tDelta = Math.sqrt(Math.pow(Math.abs(this.altimetry[Math.floor(i / (this.nrDivs + 1))][i % (this.nrDivs + 1)] - this.altimetry[Math.floor(i / (this.nrDivs + 1) - 1)][i % (this.nrDivs + 1)]), 2) + 1);
                tCoord = patchT * tDelta;
                this.texCoords[2*i + 1] = this.texCoords[2*(i-this.nrDivs-1) + 1] + tCoord;

                //DEBUG
                console.log ("j: " + Math.floor(i/(this.nrDivs+1)) + " i: " + i%(this.nrDivs+1) + "    S: " + this.texCoords[2*i] + "   T: " + this.texCoords[2*i + 1] + "    sZDelta: " + sCoord + "    tZDelta: " + tCoord);
            }
        }
        */

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    };

    display() {
      this.texture.apply();
      super.display();  
    };

}