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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

        // Scene elements
        this.jeep = new MyJeep(this);
        

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
		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[4].setPosition(0.1, 7, 7, 1.0);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[2].setLinearAttenuation(0.2);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].enable();

		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setQuadraticAttenuation(0);
		this.lights[4].setLinearAttenuation(0.2);
		this.lights[4].setConstantAttenuation(0);
		this.lights[4].enable();

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
		
		/*
		//Lamp
        
        this.pushMatrix();
        	this.scale(1, 1, 1);
        	this.translate(1, 1, 0);
            this.metalAppearance.apply();
        	this.lamp.display();
        this.popMatrix();
        
        //Cylinder (Test)
        this.pushMatrix();
        	this.scale(1, 1, 1);
            this.translate(0, 0, -0.5);
            this.metalAppearance.apply();
        	this.cylinder.display();
        this.popMatrix();

        this.materialDefault.apply();
        */
		// ---- END Scene drawing section
	};
doSomething()
{ console.log("Doing something..."); };
};
