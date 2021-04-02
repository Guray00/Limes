matrix  = [[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null], 
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null],
					[null,null,null,null, null, null, null]];



function Card (){

	makeCard = function (){
		let img = document.createElement("img");
		img.addEventListener("click", () => {
			console.log("premuto");
		});
		
		img.src = "./1.svg"
		img.className = "tessera";
		return img;
	}
}



function updateViewer(){
	this.ORIGIN_X = 7;
	this.ORIGIN_Y = 7;


	/*cerco dove inizia la griglia*/
	for (x in matrix){
		for (y in matrix[x]){
			if(matrix[x][y].getState() != -1){
				if (this.ORIGIN_X > x) this.ORIGIN_X = x;
				if (this.ORIGIN_Y > y) this.ORIGIN_Y = y;
				break;
			}
		}
	}

	removeAllCards();
	document.getElementById("griglia").innerHTML = "";

	/*inserisco le carte*/
	for (x in this.matrix){
		for (y in this.matrix[x]){
			/* se la carta non è una carta vuota */

				console.log("aggiunto");

				/*genero una nuova immagine */
				let card = matrix[x][y].makeCard();

				/* ne imposto la posizione */
				card.style.setProperty("grid-row", x - this.ORIGIN_X + 1);
				card.style.setProperty("grid-column", y - this.ORIGIN_Y + 1);

				// la aggiungo
				board.appendChild(card);
		}
	}
}



function removeAllCards(){
	document.querySelectorAll(".tessera").forEach((e) => e.parentNode.removeChild(e));
}


function begin(){
	let griglia = document.getElementById("griglia");
	
	for (let i = 0; i < 7; i++){
		for (let j = 0; j < 7; j++){
			let tmp = new Card(i, j, field);			
			matrix[i][j] = tmp;
		}
	}


}


