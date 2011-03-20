/**
 * Node class
 *  - maintains x, y, v(elocity)x, vy, depth of a node
 *  - draw itself on a canvas
 */

function Node(name, context)
{
	this.name = name;	// name of this node (displayed in a visualization)
	this.x = 0;
	this.y = 50;
	this.vx = 0;
	this.vy = 0;
	this.depth = 0;
	
	// calculate width/height of this node based on its 'name'
	this.context = context;
	this.setStyle();
	this.width = this.context.measureText(name).width + 2*this.margin;
	this.height = 20 + 2*this.margin;
};

Node.prototype.margin = 4;

Node.prototype.setDepth = function(depth){
	this.depth = depth;
};

/***
 * Prepare a drawing context (can be called only once before drawing all nodes) 
 * @param context = drawing context of a <canvas>
 */
Node.prototype.setStyle = function(){
	this.context.font = '20px sans-serif';
	this.context.textBaseline = 'top';
};

/***
 * Draw this node on a display context
 * @param context = drawing context of a <canvas>
 */
Node.prototype.draw = function(){
	// draw a white rectangle
	this.context.fillStyle = '#FFFFFF';
	this.context.fillRect(this.x, this.y, this.width, this.height);
	
	// draw name
	this.context.fillStyle = '#000000';
	this.context.fillText(this.name, this.x+this.margin, this.y+this.margin);
};