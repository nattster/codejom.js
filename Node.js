/**
 * Node class
 *  - maintains x, y, v(elocity)x, vy, depth of a node
 *  - draw itself on a canvas
 */

function randomRgb() {
    // create the rgb string
    var col =  "rgb("
    + randomColor(255) + ","
    + randomColor(255) + ","
    + randomColor(255) + ")";
    return col;
}

function randomColor(num) {          
    return Math.floor(Math.random() * num);
}     
        
function Node(name, context)
{
	this.name = name;	// name of this node (displayed in a visualization)
	this.x = 0;
	this.y = 50;
	this.vx = 0;
	this.vy = 0;
	this.depth = 0;
	this.alpha = 1;
	this.bgColor = '#FFFFFF';// randomRgb();
	this.fontColor = '#000000';
	
	
	// calculate width/height of this node based on its 'name'
	this.context = context;
	this.setStyle();
	this.width = this.context.measureText(name).width + 2*this.margin;
	this.height = 20 + 2*this.margin;
};

/***
 * Avoid using too much memory by storing functions in Node's prototype 
 */

Node.prototype.margin = 4;

Node.prototype.setAlpha = function(alpha) {
	this.alpha = alpha;
	this.bgColor = 'rgba(255,255,255,'+alpha+')';
	this.fontColor = 'rgba(0,0,0,'+alpha+')';
};

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
	this.context.save();
	// draw a white rectangle
	this.context.fillStyle = this.bgColor;
	this.context.fillRect(this.x, this.y, this.width, this.height);
	
	// draw name
	this.context.fillStyle = this.fontColor;
	this.context.fillText(this.name, this.x+this.margin, this.y+this.margin);
	this.context.restore();
};