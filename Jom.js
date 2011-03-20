/**
 * Jom class - main class
 *  - maintains list of nodes
 *  - redraw objects on canvas
 */

function Jom(canvas){
	this.canvas = canvas;					// reference to <canvas> tag
	this.context = context = canvas.getContext("2d"); // get drawing context for this canvas

	this.width = canvas.width;
	this.height = canvas.height;
	
	// prepare gradient
	bgGradient = context.createLinearGradient(0, 0, 0, this.height);
	bgGradient.addColorStop(0, '#066cc3');
	bgGradient.addColorStop(1, '#051737');
	this.bgGradient = bgGradient;
	
	// node initialization
	function newNode(name) { return new Node(name, context); };
	this.nodes = [];//[newNode("hello"), newNode("nattster"), newNode("eig"), newNode("KaewGB")];
	for(var i=0; i < 100; i++)
	{
		var n = newNode("student"+i);
		n.x = Math.random() * this.width;
		n.y = Math.random() * this.height;
		n.setDepth(parseInt(Math.random()*20));
		this.nodes.push(n);
	}
	
	// Physics simulator init
	this.physics = new Physics(this);
	
	this.animate();
};

Jom.prototype.animate = function()
{
	this.physics.simulate();
	this.draw();
};

Jom.prototype.draw = function()
{
	// draw gradiant
	this.context.fillStyle = this.bgGradient;
	this.context.fillRect(0, 0, this.width, this.height);
	
	// draw nodes
	this.nodes[0].setStyle();	// prepare brushes, fonts
	for(var index in this.nodes)
	{
		this.nodes[index].draw();
	}
};
