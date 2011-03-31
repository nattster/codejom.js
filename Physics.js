/**
 * 
 */
function Physics(jom)
{
	var level_height = 30,
	    nodes = jom.nodes,
	    time = 0;
	
	var blockWidth = 50,		// width (in pixel) of each block in grid
		blockHeight = 50,		// height
		grid = [],
		gridWidth = 0,			// number of blocks in horizontal
		gridHeight = 0;			// 					   vertical
	
	
	// initialize Grid
	gridWidth = Math.ceil(jom.width / blockWidth);
	gridHeight = Math.ceil(jom.height / blockHeight);
	grid = new Array();
	this.grid = grid;
	for(var i=0; i< gridWidth * gridHeight; i++)
		grid.push(new Object());
	
/// Private functions
	var calGridId = function(x, y) {
		// calculate Grid ID for (x,y)
		id = (y / blockHeight) * gridWidth + (x / blockWidth);
		if(id > gridHeight*gridWidth) id = gridHeight*gridWidth - 1;
		if(id < 0) id = 0;
		return parseInt(id);
	};
	
	var hit = function(a, b) {
		// return true if a collides with b
		if(a.x + a.width < b.x) return false;
		if(b.x + b.width < a.x) return false;
		if(a.y + a.height < b.y) return false;
		if(b.y + b.height < a.y) return false;
		return true;
	};
	
	var hitTest = function() {
		// separate content into grids, do a hit test between only objects in the same grid
		for(var i = 0; i < gridWidth * gridHeight; i++)
		{
			for(var index in grid[i])
			{
				for(var index2 in grid[i])
				{
					if(index == index2) continue; 
					var a = nodes[index], b = nodes[index2];
					if(hit(a, b))
					{
						var t = Math.random()*0.2;
						var ty = Math.random()*0.2;
						if(a.x < b.x)
						{
							a.vx -= t;
							b.vx += t;
						} else {
							a.vx += t;
							b.vx -= t;
						}
						if(a.depth < b.depth)
						{
							a.vy -= ty;
							b.vy += ty;
						} else if(a.depth > b.depth)
						{
							a.vy += ty;
							b.vy -= ty;
						}
					}
				}
			}
		}
	};

/// PUBLIC FUNCTIONs
	this.simulate = function() {
		time++;
		// damping
		if(time == 5)
		{
			for(var index in nodes)
			{
				var n = nodes[index];
				n.vy *= 0.8;
				n.vx *= 0.8;
			}
			time = 0;
		}
		

		for(var index in nodes)
		{
			var n = nodes[index];
			
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
		hitTest();
		for(var index in nodes)
		{
			// update node position
			var n = nodes[index];
			n.x += n.vx;
			n.y += n.vy;

			// update grid membership 
			var newGridId = calGridId(n.x + n.width/2, n.y + n.height/2);
			if('gridId' in n)	// node already got gridID, then update
			{
				// gridID change?
				if(n.gridId != newGridId)
				{
					// remove this node from old grid
					delete grid[n.gridId][index];
					// add to new grid
					grid[newGridId][index] = true;
					n.gridId = newGridId;
				}
			} else {
				// add to new grid
				grid[newGridId][index] = true;
				n.gridId = newGridId;
			}
		}
	};
}