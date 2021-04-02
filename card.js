

function Card(i, j, f){
	this.x = i;
	this.y = j;
	this.field = f;
	
	this.state = -1; // -1 => null 0=> selectable      >0 => selected
	this.element = document.createElement("img");

	this.element.addEventListener("click", () => {
		if(this.state == 0) this.field.click(this.x, this.y);
		else this.field.updateSelectable();
	});

	this.getElement = function(){
		return this.element;
	}

	this.draw = function (posX, posY, sizeX, sizeY){

		if (this.state ==-1){
			//this.element.innerHTML = "";
			this.element.className = "null_card";
			return this.element;
		}

		else if (this.state == 0){
			this.element.className = "selected_card";
			this.element.src = "./assets/preview_white.svg"
		}

		else {
		
			this.element.className = "card";
			this.element.src = "./assets/cards/"+this.state+".svg";
		}

		this.element.style.setProperty("grid-row", posX);
		this.element.style.setProperty("grid-column", posY);
		this.element.style.setProperty("height", sizeX+"px");
		this.element.style.setProperty("width", sizeY+"px");

		return this.element;
	}



	// restituisce lo stato della carta
	this.getState = function (){
		return this.state;
	}


	// controlla se ci sono tessere attive nelle vicinanze
	this.isNear = function(m){

		if (!this.state != 0){
			return false;
		}


		if (this.x > 0 && m.getCard(this.x-1, this.y).getState() > 0){
			return true;
		}

		if (this.x < 6 && m.getCard(this.x+1, this.y).getState() > 0){
			return true;
		}

		if (this.y > 0 && m.getCard(this.x, this.y-1).getState() > 0){
			return true;
		}

		if (this.y < 6 && m.getCard(this.x, this.y+1).getState() > 0){
			return true;
		}

		return false;
	}

	// rende una carta selezionabile
	this.setSelectable = function(){
		this.state = 0;
	}


	// seleziona una carta tra le disponibili
	this.select = function(){
		let  i = Math.floor(Math.random() * Card.avaiable.length);    
		this.state = Card.avaiable[i];
		Card.avaiable.splice(i,1);
	}


	// deseleziona una carta
	this.unselectable = function(){
		this.state = -1;
	}
}


Card.avaiable = [];
for (let i = 1; i <= 24; i++) Card.avaiable.push(i);
