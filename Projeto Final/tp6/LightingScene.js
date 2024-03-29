var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var SLIDES_WIDTH = 512;
var SLIDES_HEIGHT = 512;

var BOARD_DRAW_WIDHT = 512;
var BOARD_DRAW_HEIGHT = 372;

var JEEP_INIC_X = 5;
var JEEP_INIC_Z = 3;

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

		//Draw Axis
		this.drawAxis = true;

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

        this.grassAppearance = new CGFappearance(this);
        this.grassAppearance.setAmbient(0.7, 0.7, 0.7, 1);
        this.grassAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.grassAppearance.setSpecular(0.3, 0.3, 0.3, 1);
        this.grassAppearance.setShininess(50);
        this.grassAppearance.loadTexture("../resources/images/GrassTop.png");
        //this.grassAppearance.loadTexture("../resources/images/arrow_up_left.png");
        this.grassAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.rubberAppearance = new CGFappearance(this);
        this.rubberAppearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.rubberAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
        this.rubberAppearance.setSpecular(0.05, 0.05, 0.05, 1);
        this.rubberAppearance.setShininess(10);
        this.rubberAppearance.loadTexture("../resources/images/pneu1.jpg");
        this.rubberAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.tireSideAppearance = new CGFappearance(this);
        this.tireSideAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.tireSideAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
        this.tireSideAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.tireSideAppearance.setShininess(50);
        this.tireSideAppearance.loadTexture("../resources/images/pneu2.jpg");
        this.tireSideAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.carpetCityAppearance = new CGFappearance(this);
        this.carpetCityAppearance.setAmbient(0.8, 0.8, 0.8, 1);
        this.carpetCityAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.carpetCityAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.carpetCityAppearance.setShininess(20);
        this.carpetCityAppearance.loadTexture("../resources/images/childCarpet.jpg");
        this.carpetCityAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.redAppearance = new CGFappearance(this);        
        this.redAppearance.setAmbient(0.8, 0.8, 0.8, 1);
        this.redAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.redAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.redAppearance.setShininess(20);
        this.redAppearance.loadTexture("../resources/images/red.png");
        this.redAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.camoAppearance = new CGFappearance(this);        
        this.camoAppearance.setAmbient(0.8, 0.8, 0.8, 1);
        this.camoAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.camoAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.camoAppearance.setShininess(20);
        this.camoAppearance.loadTexture("../resources/images/CamoTexture.png");
        this.camoAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.blinkerAppearance = new CGFappearance(this);        
        this.blinkerAppearance.setAmbient(0.8, 0.8, 0.8, 1);
        this.blinkerAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.blinkerAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.blinkerAppearance.setShininess(20);
        this.blinkerAppearance.loadTexture("../resources/images/blinker.jpg");
		this.blinkerAppearance.setTextureWrap("REPEAT", "REPEAT");
		
        this.currAppearance = "Red Jeep";
        this.vehicleAppearances = ["Red Jeep", "Camoflage", "Metal"];


        //Terrain
        this.altimetry = [
			[2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.6, 1.3, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.5, 2.0, 2.0],
			[1.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.8, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.8],
			[1.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 1.0, 1.6],
			[1.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.8, 1.5],
			[1.6, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.5, 1.4],
			[1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.3],
			[1.5, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0, 0.0, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.2],
			[1.5, 0.8, 0.8, 0.6, 0.5, 0.0, 0.0, 0.0, 0.3, 0.5, 0.5, 0.5, 0.5, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.1],
			[1.5, 1.0, 0.8, 0.5, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.8, 0.8, 0.8, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[1.5, 1.0, 0.8, 0.5, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.8, 1.0, 0.8, 0.5, 0.3, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[1.4, 1.0, 0.8, 0.5, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.8, 0.8, 0.8, 0.5, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[1.3, 1.0, 0.8, 0.5, 0.0, 0.0, 0.0, 0.3, 0.3, 0.5, 0.8, 0.8, 0.5, 0.5, 0.3, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[1.2, 0.8, 0.5, 0.5, 0.0, 0.0, 0.0, 0.3, 0.5, 0.5, 0.8, 0.8, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[1.1, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.8, 0.8, 0.8, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.5, 0.5, 0.5, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5],
			[1.0, 0.0, 0.0, 0.0, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.5, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[1.0, 0.0, 0.0, 0.0, 0.3, 0.0, 0.0, 0.0, 0.0, 0.3, 0.3, 0.3, 0.3, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.8],
			[1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.8, 0.0],
			[1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.8, 0.0, 0.5],
			[0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0, 0.0, 0.0, 0.5],
			[0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0, 0.0, 0.0, 0.0, 0.5],
			[0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.8, -0.0, 0.0, 0.0, 0.0, 0.5],
			[0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0, -0.8, 0.0, 0.0, 0.0, 0.0, 0.5],
			[0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0, -0.0, 0.0, 0.0, 0.0, 0.0, 0.5],
			[0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0, -0.0, 0.0, 0.0, 0.0, 0.0, 0.5],
			[0.01, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.8, -0.8, 0.0, 0.0, 0.0, 0.0, 0.5],
			[0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.1, 0.1, 0.1, 0.1, 0.5, 0.5, 0.0, -0.8, -0.8, 0.0, 0.5, 0.5, 0.5, 1.0],
        ];

        // Scene elements
        this.jeep = new MyJeep(this, this.redAppearance, this.glassAppearance, this.rubberAppearance, this.tireSideAppearance, this.blinkerAppearance);
        this.terrain = new MyTerrain(this, this.altimetry.length - 1, this.altimetry, this.carpetCityAppearance);
		this.crane = new MyCrane(this);
		this.placeQuad = new MyQuad(this);

        this.setUpdatePeriod(20);

		this.lightS=true; 
		this.lightNW=true;
		this.lightNE=true;
		this.acceleration = 1.0;
		this.maneuverability = 1.0;
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.1,0.1,0.1, 1.0);
		//this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);
		//this.setGlobalAmbientLight(1.0,1.0,1.0, 1.0);
		
		// Positions for lights
		this.lights[0].setPosition(0, 10, 10, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setLinearAttenuation(0.05);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].enable();

		this.lights[1].setPosition(-15, 15, -15, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setQuadraticAttenuation(0);
		this.lights[1].setLinearAttenuation(0.05);
		this.lights[1].setConstantAttenuation(0);
		this.lights[1].enable();

		this.lights[2].setPosition(15, 15, -15, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setLinearAttenuation(0.05);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].enable();
	};

	updateLights() 
	{
		if (this.lightS) this.lights[0].enable();
		else this.lights[0].disable();
		if (this.lightNW) this.lights[1].enable();
		else this.lights[1].disable();
		if (this.lightNE) this.lights[2].enable();
		else this.lights[2].disable();
		
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

    update(currTime) //recebe tempo do sistema em milisegundos 
    {
		this.checkKeys();
		this.jeep.update(currTime);
		this.checkTexture();

		//crane-related
		if (this.jeep.xCoord + JEEP_INIC_X < -7.5 && this.jeep.xCoord + JEEP_INIC_X > -9.5 
			&& this.jeep.zCoord + JEEP_INIC_Z > 17 && this.jeep.zCoord + JEEP_INIC_Z < 19) {
			this.crane.fetch(true);
		}
		else {
			this.crane.fetch(false);
		}
		this.crane.update(currTime);
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
		if (this.drawAxis) this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section

		//Jeep
		if (!this.crane.hasCar) {
			this.pushMatrix();
				this.translate(JEEP_INIC_X, 0, JEEP_INIC_Z);
				this.jeep.display();
			this.popMatrix();
		}
		//Terrain
		this.pushMatrix();
			this.rotate(-Math.PI / 2, 1, 0, 0);
			this.scale(50, 50, 50);
			this.terrain.display();
		this.popMatrix();
		
		//Crane
		this.pushMatrix();
		this.translate(-16.3, 0, 13.5);
			this.crane.display();
		this.popMatrix();

		//R Quad
		this.pushMatrix();
			this.translate(-8.5, 0.01, 18);
			this.scale(4, 1, 4);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.placeQuad.display();
		this.popMatrix();

		//D Quad
		this.pushMatrix();
			this.translate(-21, 0.02, 21);
			this.scale(8, 1, 8);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.placeQuad.display();
		this.popMatrix();
		// ---- END Scene drawing section
	};

	checkKeys()
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		var wPressed = false;
		var sPressed = false;
		var aPressed = false;
		var dPressed = false;
		var spacePressed = false;
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			keysPressed=true;
			wPressed = true;
		}
		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			keysPressed=true;
			sPressed = true;
		}
		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			keysPressed=true;
			aPressed = true;
		}
		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			keysPressed=true;
			dPressed = true;
		}
		if (this.gui.isKeyPressed("Space"))
		{
			text+=" Space Bar ";
			keysPressed=true;
			spacePressed = true;
		}
		if (keysPressed)
			console.log(text);

			if (spacePressed) {
				this.jeep.setAcceleration(0);
				this.jeep.setSpeed(0);
			}
			else {
				if (wPressed && !sPressed) {		//forward
					this.jeep.setAcceleration(10 * this.acceleration);
				}
				else if (sPressed && !wPressed) {	//backwards
					this.jeep.setAcceleration(-10 * this.acceleration);
				}
				else {								//stopped
					this.jeep.setAcceleration(0);
				}

				if(aPressed && !dPressed) {
					this.jeep.setRotationTarget(0.3 * this.maneuverability);
				}
				else if (dPressed && !aPressed) {
					this.jeep.setRotationTarget(-0.3 * this.maneuverability);
				}
				else {
					this.jeep.setRotationTarget(0);
				}
			}
	}

	checkTexture() {
		this.lastAppearance
		if (this.lastAppearance != this.currAppearance) {
			switch (this.currAppearance) {
				case this.vehicleAppearances[0]:
					this.jeep.setTextureMetal(this.redAppearance);
					break;
				case this.vehicleAppearances[1]:
					this.jeep.setTextureMetal(this.camoAppearance);
					break;
				case this.vehicleAppearances[2]:
					this.jeep.setTextureMetal(this.metalAppearance);
					break;
			}
			this.lastAppearance = this.currAppearance;
		}
	}

	doSomething()
	{ 
		console.log("Doing something...");
	};

	toggleAxis() 
	{
		console.log("Toggling Axis...");
		this.drawAxis = !this.drawAxis;
	}

};

