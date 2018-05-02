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
        this.prism = new MyPrism(this, 8, 20);
        this.cylinder = new MyCylinder(this, 8, 20);
        this.lamp = new MyLamp(this, 16, 16);
		this.chair = new MyChair(this);
		this.table = new MyTable(this);
		this.wall = new MyQuad(this, -1, 2, -0.5, 1.5);
        this.floor = new MyQuad(this, 0, 10, 0, 12);
        this.clock = new MyClock(this);
        this.plane = new MyPaperPlane(this);
		
		this.boardA = new Plane(this, BOARD_A_DIVISIONS, BOARD_WIDTH, BOARD_HEIGHT, SLIDES_WIDTH, SLIDES_HEIGHT);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS, BOARD_WIDTH, BOARD_HEIGHT, BOARD_DRAW_WIDHT, BOARD_DRAW_HEIGHT);

		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);
		
		this.materialWood = new CGFappearance(this);
		this.materialWood.setAmbient(0.2,0.1,0,1);
		this.materialWood.setDiffuse(0.2, 0.1, 0, 1);
		this.materialWood.setSpecular(0.05, 0.025, 0, 1);
		this.materialWood.setShininess(10);

		this.materialMetal = new CGFappearance(this);
		this.materialMetal.setAmbient(0.5,0.5,0.5,1);
		this.materialMetal.setDiffuse(0.5, 0.5, 0.5, 1);
		this.materialMetal.setSpecular(0.7, 0.7, 0.7, 1);
		this.materialMetal.setShininess(150);
		this.materialMetal.loadTexture("../resources/images/metal.jpg");
		this.materialMetal.setTextureWrap("REPEAT","REPEAT");

		this.materialWalls = new CGFappearance(this);
		this.materialWalls.setAmbient(0.7,0.7,0.7,1);
		this.materialWalls.setDiffuse(0.7, 0.7, 0.7, 1);
		this.materialWalls.setSpecular(0.1, 0.1, 0.1, 1);
		this.materialWalls.setShininess(10);
		this.materialWalls.loadTexture("../resources/images/BlueWall.jpg");
		this.materialWalls.setTextureWrap("REPEAT","REPEAT");

		this.tableAppearance = new CGFappearance(this);
		this.tableAppearance.setAmbient(0.7,0.7,0.7,1);
		this.tableAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.tableAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.tableAppearance.setShininess(10);
		this.tableAppearance.loadTexture("../resources/images/table.png");
		this.tableAppearance.setTextureWrap("REPEAT","REPEAT");

		this.chairAppearance = new CGFappearance(this);
		this.chairAppearance.setAmbient(0.7,0.7,0.7,1);
		this.chairAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.chairAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.chairAppearance.setShininess(10);
		this.chairAppearance.loadTexture("../resources/images/wood2.jpg");
		this.chairAppearance.setTextureWrap("REPEAT","REPEAT");

		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.setAmbient(0.7, 0.7, 0.7, 1);
		this.floorAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.floorAppearance.setShininess(10);
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap("REPEAT","REPEAT");

		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.setAmbient(0.7, 0.7, 0.7, 1);
		this.windowAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.windowAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.windowAppearance.setShininess(10);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.setAmbient(0.7, 0.7, 0.7, 1);
		this.slidesAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.slidesAppearance.setShininess(10);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.boardAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
		this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
		this.boardAppearance.setShininess(120);
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

		this.columnAppearance = new CGFappearance(this);
		this.columnAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.columnAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
		this.columnAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.columnAppearance.setShininess(10);
		this.columnAppearance.loadTexture("../resources/images/ColumnTexture.jpg");
		this.columnAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

		this.concreteAppearance = new CGFappearance(this);
		this.concreteAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.concreteAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
		this.concreteAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.concreteAppearance.setShininess(10);
		this.concreteAppearance.loadTexture("../resources/images/moldyConcrete.png");
        this.concreteAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

        this.clockAppearance = new CGFappearance(this);
		this.clockAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
		this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.clockAppearance.setShininess(10);
		this.clockAppearance.loadTexture("../resources/images/clock.png");
        this.clockAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

        this.clockHandAppearance = new CGFappearance(this);
		this.clockHandAppearance.setAmbient(0.1, 0.1, 0.1, 1);
		this.clockHandAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
		this.clockHandAppearance.setSpecular(0.005, 0.005, 0.005, 1);
		this.clockHandAppearance.setShininess(10);
		
		this.paperAppearance = new CGFappearance(this);
		this.paperAppearance.setAmbient(0.8, 0.8, 0.8, 1);
		this.paperAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
		this.paperAppearance.setSpecular(0.1, 0.1, 0.1, 1);
		this.paperAppearance.setShininess(10);
		this.paperAppearance.loadTexture("../resources/images/paper.jpg");
        this.paperAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

        this.glassAppearance = new CGFappearance(this);
		this.glassAppearance.setAmbient(0.6, 0.6, 0.6, 1);
		this.glassAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
		this.glassAppearance.setSpecular(0.4, 0.4, 0.4, 1);
		this.glassAppearance.setShininess(100);
		this.glassAppearance.loadTexture("../resources/images/glass.png");
        this.glassAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

        this.setUpdatePeriod(100);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		//Turn this line on only when you need to verify meshes in dark areas.
		//this.setGlobalAmbientLight(0.3,0.3,0.3, 1.0);
		this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);
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
        this.clock.update(currTime);
        this.plane.update(currTime);
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

        // Plane
        this.pushMatrix();
        	this.translate(12, 4, 8);
        	this.rotate(-Math.PI/2, 0, 1, 0);
        	this.paperAppearance.apply();
        	this.plane.display();
        this.popMatrix();

        // Clock
        this.pushMatrix();
            this.translate(7.25, 7.25, 0.075);
            this.scale(1, 1, 0.15);
            this.clock.display();
        this.popMatrix();

        // Prism
        this.pushMatrix();
        	this.translate(14.5, 4, 0.5);
        	this.rotate(90 * degToRad, 1, 0, 0);
        	this.scale(1, 1, 8);
        	this.concreteAppearance.apply();
        	this.prism.display();
        this.popMatrix();

        // Cylinder
        this.pushMatrix();
        	this.translate(0.5, 4, 0.5);
        	this.rotate(90 * degToRad, 1, 0, 0);
        	this.scale(1, 1, 8);
        	this.columnAppearance.apply();
        	this.cylinder.display();
        this.popMatrix();

		//Lamp
        
        this.pushMatrix();
        	this.translate(7.5, 8, 7.5);
        	this.rotate(90 * degToRad, 1, 0, 0);
        	this.scale(2, 2, 2);
        	this.glassAppearance.apply();
        	this.lamp.display();
        this.popMatrix();

		// Floor
		
		this.floorAppearance.apply();
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.windowAppearance.apply();
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.materialWalls.apply();
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.wall.display();
		this.popMatrix();

		// First Chair
		this.pushMatrix();
			this.translate(5, 0, 10);
			this.chair.display();
		this.popMatrix();

		// Second Chair
		this.pushMatrix();
			this.translate(12, 0, 10);
			this.chair.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.slidesAppearance.apply();
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.boardAppearance.apply();
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardB.display();
        this.popMatrix();

        this.materialDefault.apply();
		// ---- END Scene drawing section
	};
doSomething()
{ console.log("Doing something..."); };
};
