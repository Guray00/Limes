
// classe carta
function Card(i, j, f){
	this.x = i;
	this.y = j;
	this.field = f;
	
	this.state = -1; // -1 => null 0=> selectable   >0 => selected
	this.element = document.createElement("div");

	this.element.addEventListener("click", () => {
		if(this.state == 0) this.field.selectCard(this.x, this.y);
		else this.field.updateSelectable();
	});

	this.getElement = function(){
		return this.element;
	}

	this.generateHut = function(el, posx, posy){
		let hut = document.createElement("div");
		hut.className = "hut";
		hut.style.setProperty("grid-column",  posy);
		hut.style.setProperty("grid-row",  posx);
		el.appendChild(hut);
	}

	// costruisce il contenuto della carta
	this.build = function(model){
		let m = [["", ""], 
				 ["", ""]];

		m[0][0] = model["q1"]["type"];
		m[0][1] = model["q2"]["type"];
		m[1][0] = model["q3"]["type"];
		m[1][1] = model["q4"]["type"];

		// vengono aggiunti gli elementi adiacenti come unica cella
		
		/*for (let i = 0; i< 2; i++){
			for (let j = 0; j < 2; j++){

				if (m[i][j] != "" && i > 0 && m[i-1][j] == m[i][j]){
					let el = document.createElement("div");
					el.className = m[i][j];
					m[i][j] = "";
					m[i-1][j] = "";
					el.style.setProperty("grid-column-start", j+1);
					el.style.setProperty("grid-column-end",  j+1);
					el.style.setProperty("grid-row-end",  "span 2");
					this.element.appendChild(el);
				}

				if (m[i][j] != "" && i < 1 && m[i+1][j] == m[i][j]){
					let el = document.createElement("div");
					el.className = m[i][j];
					m[i][j] = "";
					m[i+1][j] = "";
					el.style.setProperty("grid-column-start", j+1);
					el.style.setProperty("grid-column-end",  j+1);
					el.style.setProperty("grid-row-end",  "span 2");
					this.element.appendChild(el);
				}
				

				if (m[i][j] != "" && j > 0 && m[i][j-1] == m[i][j]){
					let el = document.createElement("div");
					el.className = m[i][j];
					m[i][j-1] = "";
					m[i][j] = "";
					el.style.setProperty("grid-column-end",  "span 2");
					el.style.setProperty("grid-row-start",  i+1);
					el.style.setProperty("grid-row-end",  i+1);
					this.element.appendChild(el);
				}

				if (m[i][j] != "" && j < 1 && m[i][j+1] == m[i][j]){
					let el = document.createElement("div");
					el.className = m[i][j];
					m[i][j] = "";
					m[i][j+1] = "";
					el.style.setProperty("grid-column-end",  "span 2");
					el.style.setProperty("grid-row-start",  i+1);
					el.style.setProperty("grid-row-end",  i+1);
					this.element.appendChild(el);
				}
			}
		}*/

		// vengono aggiunte parti che non si espandono

		let count = 0;
		for (let i = 0; i < 2; i++){
			for (let j = 0; j<2; j++){
				count++;
				if (m[i][j] != ""){
					let el = document.createElement("div");
					el.className = "zone "+m[i][j];

					m[i][j] = "";

					el.style.setProperty("grid-column-start", j+1);
					el.style.setProperty("grid-column-end",  j+1);
					
					el.style.setProperty("grid-row-start",  i+1);
					el.style.setProperty("grid-row-end",  i+1);

					// costruisco le case
					let z = 0;
					for (x in model["q"+count]["hut"]){
						console.log(x);
						// sopra
						if      (x == 0 && model["q"+count]["hut"][x] == 1) this.generateHut(el, 1, 2);	
						// destra
						else if (x == 1 && model["q"+count]["hut"][x] == 1) this.generateHut(el, 2, 3);
						// sotto
						else if (x == 2 && model["q"+count]["hut"][x] == 1) this.generateHut(el, 3, 2);
						// sinistra
						else if (x == 3 && model["q"+count]["hut"][x] == 1) this.generateHut(el, 2, 1);

					}


					this.element.appendChild(el);
				}
			}
		}
	}

	// disegna e posiziona correttamente la carta
	this.draw = function (posX, posY, size){
		if (this.state ==-1){
			this.element.className = "null_card";
			return this.element;
		}

		else if (this.state == 0){
			this.element.className = "selected_card";
			this.element.style.setProperty("background-size", "contain");
		}

		else {
			this.element.className = "card";
		}

		// removing border
		let border = parseFloat(getComputedStyle(this.element).getPropertyValue("border-width"));
		size-= border*2;

		this.element.style.setProperty("grid-row", posX);
		this.element.style.setProperty("grid-column", posY);
		this.element.style.setProperty("height", size+"px");
		this.element.style.setProperty("width", size+"px");
		//his.element.style.setProperty("min-height", sizeX+"px");
		//this.element.style.setProperty("min-width", sizeY+"px");
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
		this.state = 2;
		console.log(Card.avaiable[i]);
		//console.log(this.state);

		this.build(Card.avaiable[i]);
		Card.avaiable.splice(i,1);
		// la costruzione delle sottoparti deve avvenire solamente al momento dell'attivazione
	}


	// deseleziona una carta
	this.unselectable = function(){
		this.state = -1;
	}
}


Card.avaiable = [];


//this.element.style.setProperty("grid-template-rows", "1fr 1fr");
//this.element.style.setProperty("grid-template-columns", "1fr 1fr");
//this.element.src = "./assets/cards/"+this.state+".svg";