/**
 * 
 */
function Physics(jom)
{
	var level_height = 30;
	
	// constructor
	this.nodes = jom.nodes;
	this.time = 0;

	this.simulate = function() {
		this.time++;
		// damping
		if(this.time == 5)
		{
			for(var index in this.nodes)
			{
				var n = this.nodes[index];
				n.vy *= 0.8;
				n.vx *= 0.8;
			}
			this.time = 0;
		}
		

		for(var index in this.nodes)
		{
			var n = this.nodes[index];
			
			// Buoyancy
			n.vy += (n.depth*level_height - n.y)*0.001 + (Math.random() * 0.05 - 0.025);
			
			// Brownian with left-right limit
			if(n.x < 0)
			{
				n.vx += 1;
			} else if(n.x > jom.width) {
				n.vx += -1;
			} else {
				n.vx += (Math.random() - 0.5) * 0.25;
			}
		}
		// hit test
		
		// update node position
		for(var index in this.nodes)
		{
			var n = this.nodes[index];
			n.x += n.vx;
			n.y += n.vy;
		}
	};
}