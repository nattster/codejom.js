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
	this.nodes = [newNode("hello"), newNode("nattster")];
	this.nodes[0].x = 10;
	this.nodes[1].x = 100;
	
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
