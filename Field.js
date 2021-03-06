function Field(){
	this.board = document.getElementById("board");
	

	// matrice del tabellone
	this.matrix  = [[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null]];

	this.ORIGIN_X = 3;
	this.ORIGIN_Y = 3;
	this.ENDX = 0;
	this.ENDY = 0;

	// inizializzo il campo
	this.init = function(){
		for (let i = 0; i < this.matrix[0].length; i++){
			for (let j = 0; j < this.matrix.length; j++){
				let tmp = new Card(i, j, this);			
				this.addCard(tmp);
			}
		}
	
		this.selectCard(3,3);
		
		window.addEventListener('resize', ()=>{
			this.draw();
		});
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

		// tengo conto dei margini
		height -= (margin*2);
		width  -= (margin*2);

		// ritorno le dimensioni corrette delle tessere
		let h,w = 0;
		if (height/rows < width/columns){
			h = (height-gap*rows)/rows;
			return h;
		}

		else {
			w = (width-gap*columns)/columns;
			return w;
		}
	}


	//cerco dove inizia la griglia
	this.updateOrigin = function(){
		this.ORIGIN_X = this.matrix[0].length;
		this.ORIGIN_Y = this.matrix.length;
		this.ENDX = 0;
		this.ENDY = 0;

		for (x in this.matrix){
			for (y in this.matrix[x]){
				if(this.matrix[x][y].getState() != -1){
					if (this.ORIGIN_X > x) this.ORIGIN_X = x;
					if (this.ORIGIN_Y > y) this.ORIGIN_Y = y;

					if (this.ENDX < x) this.ENDX = x;
					if (this.ENDY < y) this.ENDY = y;
				}
			}
		}
	}


	/*necessario per nascondere gli elementi inutili della griglia*/ 
	this.draw = function(){
		this.updateOrigin();					// aggiorno il top-left della matrice
		let size = this.calcSize();				// calcolo le dimensioni delle tessere
		
		for (x in this.matrix){
			for (y in this.matrix[x]){					
				let posX = x - this.ORIGIN_X+1;	// trovo le nuove coordinate per ciascuna carta
				let posY = y - this.ORIGIN_Y+1;

				this.getCard(x, y).draw(posX, posY, size); // ridisegno la carta
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

		// se non ci sono pi?? carte lo impedisco
		if (this.cardCheck()) return;

		this.getCard(x, y).select();
		this.hideSelectable();
		this.draw();
	}

	//quando premo una carta
	this.click = function (x,y){
		this.selectCard(x,y);
	}

	// controllo se ci sono carte da giocare
	this.cardCheck = function(){
		if (Card.avaiable.length == 0){
			alert("carte finite");
			return true;
		}
	}

	this.gameOverCheck = function(){
		let over = true;
		for (x in this.matrix){
			for (y in this.matrix[x]){
				if (this.matrix[x][y].getState() == 0) over = false;
			}
		}

		return over;
	}

	// creo le carte tratteggiate
	this.updateSelectable = function() {
		if (this.cardCheck()) return;

		for (x in this.matrix){
			for (y in this.matrix[x]){
				// controllo per ogni carta se ne  esiste una adiacente attiva
				if (this.getCard(x, y).isNear(this) && this.getCard(x, y).state == -1){	

					let w = this.ENDX - this.ORIGIN_X +1;
					let h = this.ENDY - this.ORIGIN_Y +1;
					

					// se esce dalla x e sono gi?? presenti 4 tessere non fare nulla
					if ( (x < this.ORIGIN_X  || x > this.ENDX) && (w > 3) ){}
					// se esce dalla y e sono gi?? presenti 4 tessere non fare nulla
					else if (  (y < this.ORIGIN_Y  || y > this.ENDY) && (h > 3) ){
					}

					else{
						this.matrix[x][y].setSelectable(this);
						avaiable = true;
					}
						
				}				
			}
		}

		if (this.gameOverCheck()) {
			alert("game over");
			return;
		}

		this.draw();
		
	}
}

