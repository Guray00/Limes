function Field(){
	this.board = document.getElementById("board");
	this.ORIGIN_X = 4;
	this.ORIGIN_Y = 4;
	this.ENDX = 0;
	this.ENDY = 0;


	this.matrix  = [[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null]];


	this.init = function(){
		for (let i = 0; i < 7; i++){
			for (let j = 0; j < 7; j++){
				let tmp = new Card(i, j, this);			
				this.addCard(tmp);
			}
		}
	
		this.selectCard(4,4);	
	}

	// aggiunge una carta alla matrice
	this.addCard = function(card){
		this.matrix[card.x][card.y] = card;
		this.board.appendChild(card.getElement());
	}

	// restituisce la matrice
	this.getMatrix = function(){
		return this.matrix;
	}

	// restituisce una carta della matrice
	this.getCard = function(x, y){
		return this.matrix[x][y];
	}

	
	// calcola la dimensione delle tessere
	this.calcSize = function (){

		// calcolo il numero di righe e il numero di colonne
		let rows    = this.ENDX-this.ORIGIN_X+1;
		let columns = this.ENDY-this.ORIGIN_Y+1;

		// prendo le dimensione del padre
		let width  = this.board.parentElement.offsetWidth;
		let height = this.board.parentElement.offsetHeight;

		// recupero il gap tra le celle
		const gap = parseFloat(getComputedStyle(board).getPropertyValue("grid-gap"));
		const margin = parseFloat(getComputedStyle(board).getPropertyValue("margin"));
		console.log("margin: "+margin);

		height-= (margin*2);
		width-= (margin*2);

		// ritorno le dimensioni corrette delle tessere
		let h,w = 0;
		if (height/rows < width/columns){
			h = (height-gap*rows)/rows;
			//let pt = 3/4*h;
			return h,h;
		}

		else {
			w = (width-gap*columns)/columns;
			//let pt = 3/4*w;
			return w,w;
		}
	}


	this.updateOrigin = function(){
		this.ORIGIN_X = 7;
		this.ORIGIN_Y = 7;
		this.ENDX = 0;
		this.ENDY = 0;

		/*cerco dove inizia la griglia*/
		for (x in this.matrix){
			for (y in this.matrix[x]){
				if(this.matrix[x][y].getState() != -1){
					if (this.ORIGIN_X > x) this.ORIGIN_X = x;
					if (this.ORIGIN_Y > y) this.ORIGIN_Y = y;

					if (this.ENDX < x) this.ENDX = x;
					if (this.ENDY < y) this.ENDY = y;
					//break;
				}
			}
		}
	}


	/*necessario per nascondere gli elementi inutili della griglia*/ 
	this.draw = function(){
		this.updateOrigin();
		console.log("origin: "+ this.ORIGIN_X + " " + this.ORIGIN_Y);
		let sizeX, sizeY = this.calcSize();

		// cancello la griglia
		//board.innerHTML = "";
		
		for (x in this.matrix){
			for (y in this.matrix[x]){					
				let posX = x - this.ORIGIN_X+1;
				let posY = y - this.ORIGIN_Y+1;

				this.getCard(x, y).draw(posX, posY, sizeX, sizeY);
			}
		}		
	}


	// trasformo le carte tratteggiate in invisibili
	this.hideSelectable = function(){
		for (x in this.matrix){
			for (y in this.matrix[x]){
				if(this.matrix[x][y].state == 0){
					this.matrix[x][y].unselectable();
				}
			}
		}
	}

	// seleziono una carta
	this.selectCard = function (x, y){
		this.getCard(x, y).select();
		this.hideSelectable();
		this.draw();
	}

	//quando premo una carta
	this.click = function (x,y){
		this.selectCard(x,y);
	}


	// creo le carte tratteggiate
	this.updateSelectable = function() {
		for (x in this.matrix){
			for (y in this.matrix[x]){

				if (this.getCard(x, y).isNear(this) && this.getCard(x, y).state == -1){	
					this.getCard(x,y).setSelectable(this);
				}				
			}
		}

		this.draw();
	}
}

