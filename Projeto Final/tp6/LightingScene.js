var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var SLIDES_WIDTH = 512;
var SLIDES_HEIGHT = 512;

var BOARD_DRAW_WIDHT = 512;
var BOARD_DRAW_HEIGHT = 372;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();
		this.enableTextures(true);

		this.gl.clearColor(0.5, 0.8, 0.9, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

        //Terrain
        this.altimetry = [
            [2.0, 3.0, 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0],
            [2.0, 3.0, 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0],
            [0.0, 0.0, 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [2.0, 3.0, 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.0]
        ];

        //this.altimetry = [[0.0, 1.0],[2.0, 3.0]];
        console.log(this.altimetry[0][7]);

        // Scene elements
        this.jeep = new MyJeep(this);
        this.terrain = new MyTerrain(this, 8, this.altimetry);
        

		// Materials
        this.materialDefault = new CGFappearance(this);

        this.metalAppearance = new CGFappearance(this);
        this.metalAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.metalAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.metalAppearance.setSpecular(0.7, 0.7, 0.7, 1);
        this.metalAppearance.setShininess(150);
        this.metalAppearance.loadTexture("../resources/images/metal.jpg");
        this.metalAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.glassAppearance = new CGFappearance(this);
		this.glassAppearance.setAmbient(0.6, 0.6, 0.6, 1);
		this.glassAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
		this.glassAppearance.setSpecular(0.4, 0.4, 0.4, 1);
		this.glassAppearance.setShininess(100);
		this.glassAppearance.loadTexture("../resources/images/glass.png");
        this.glassAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

        this.setUpdatePeriod(20);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		//Turn this line on only when you need to verify meshes in dark areas.
		this.setGlobalAmbientLight(0.3,0.3,0.3, 1.0);
		//this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);
		//this.setGlobalAmbientLight(1.0,1.0,1.0, 1.0);
		
		// Positions for lights
		this.lights[0].setPosition(1, 15, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setLinearAttenuation(0.05);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].enable();

		this.option1=true; 
		this.option2=false;
		this.speed=3;

	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

    update(currTime) //recebe tempo do sistema em milisegundos 
    {

    }

	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section

		//Jeep
		this.pushMatrix();
			this.jeep.display();
		this.popMatrix();

		//Terrain
		this.pushMatrix();
			this.rotate(-Math.PI / 2, 1, 0, 0);
			this.scale(50, 50, 20);
			this.terrain.display();
			console.log(this.terrain.vertices[2]);
		this.popMatrix();
		
		
		// ---- END Scene drawing section
	};
doSomething()
{ console.log("Doing something..."); };
};
