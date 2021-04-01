

function Field(board){
	
	this.board = board;
	this.ORIGIN_X = 4;
	this.ORIGIN_Y = 4;
	this.END_X = 4;
	this.END_Y = 4;

	this.matrix  = [[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null]];

	this.addCard = function(card){
		this.matrix[card.x][card.y] = card;
		board.appendChild(card.getElement());
	}

	this.getMatrix = function(){
		return this.matrix;
	}

	this.getCard = function(x, y){
		return this.matrix[x][y];
	}

	/*necessario per nascondere gli elementi inutili della griglia*/ 
	this.updateViewer = function(){
		this.ORIGIN_X = 7;
		this.ORIGIN_Y = 7;

		this.END_X = 0;
		this.END_Y = 0;

		for (x in this.matrix){
			for (y in this.matrix[x]){
				if(this.matrix[x][y].getState() != -1){
					console.log(x + " "+ y)
					if (this.ORIGIN_X > x) this.ORIGIN_X = x;
					if (this.ORIGIN_Y > y) this.ORIGIN_Y = y;
					break;
				}
			}
		}

		console.log("ORIGIN STARTS: " + this.ORIGIN_X + " "+ this.ORIGIN_Y);

		for (x in this.matrix){
			for (y in this.matrix[x]){
				if(this.matrix[x][y].getState() != -1){
					this.matrix[x][y].div.style.setProperty("grid-row", x - this.ORIGIN_X + 1);
					this.matrix[x][y].div.style.setProperty("grid-column", y - this.ORIGIN_Y + 1);
					//this.matrix[x][y].div.innerHTML = "x: " + (x - this.ORIGIN_X + 1) +" y: "+ (y - this.ORIGIN_Y + 1); 
				}

				else{

				}
			}
		}
	}

	this.hideSelectable = function(){
		for (x in this.matrix){
			for (y in this.matrix[x]){
				if(this.matrix[x][y].state == 0){
					this.matrix[x][y].unselectable();
				}
			}
		}
	}

	this.selectCard = function (x, y){
		this.getCard(x, y).select();
		this.hideSelectable();
		this.updateViewer();
	}

	this.click = function (x,y){
		if (this.getCard(x, y).state != 0){
			return;
		}
		this.selectCard(x,y);
	}


	this.updateSelectable = function() {
		
		for (x in this.matrix){
			for (y in this.matrix[x]){

				if (this.getCard(x, y).isNear(this) && this.getCard(x, y).state == -1){
					
					this.getCard(x,y).setSelectable(this);
					board.appendChild(this.getCard(x, y).getElement());
				}
			}
		}

		this.updateViewer();
	}
}