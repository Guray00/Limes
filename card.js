

function Card(i, j, f){
	this.x = i;
	this.y = j;
	this.field = f;
	/*this.div = document.createElement('div');
	this.div.style.setProperty("background-repeat", "no-repeat");
	this.div.style.setProperty("background-size", "contain");
	this.div.style.setProperty("background-position", "center");*/

	this.div = document.createElement("img");
	this.div.src = "./assets/null_card.svg"

	this.div.addEventListener("click", () => {
		console.log("premuto");
		if(this.state < 1) this.field.click(this.x, this.y);
		else this.field.updateSelectable();
	});

	this.div.style.setProperty("grid-row", i);
	this.div.style.setProperty("grid-column", j);
	
	this.div.alt = "x: " + this.x +" y: "+ this.y;

	this.state = -1; // 0 => null 1=> selectable 2=> selected
	this.div.className = "null_card";

	this.getElement = function() {
		return this.div;
	}


	this.getState = function (){
		return this.state;
	}



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

	this.setSelectable = function(){
		this.state = 0;
		this.div.className = "selected_card";
		this.div.src = "./assets/preview_white.svg"
	}

	this.select = function(){
		let  i = Math.floor(Math.random() * Card.avaiable.length);    
		this.state = Card.avaiable[i];
		Card.avaiable.splice(i,1);

		this.div.className = "card";
		this.div.src = "./assets/cards/"+this.state+".svg";
	}

	this.unselectable = function(){
		this.state = -1;
		this.div.className = "null_card";
		this.div.src = "./assets/null_card.svg"
	}
}


Card.avaiable = [];
for (let i = 1; i <= 24; i++) Card.avaiable.push(i);
