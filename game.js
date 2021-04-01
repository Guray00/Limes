

function begin(){
	
	/*for (let i = 1; i <= 4; i++){		
		for (let j = 1; j<= 2; j++){
			let pawn = new Image();
			pawn.src = "./assets/pawn.png";
			pawn.id = "pawn";
			
			pawn.style.setProperty("grid-column", i);
			pawn.style.setProperty("grid-row", j);

			document.getElementById("pawns").appendChild(pawn);
		}
	}*/

	this.board = document.getElementById("board");
	this.field = new Field(board);
	
	for (let i = 0; i < 7; i++){
		for (let j = 0; j < 7; j++){
			let tmp = new Card(i, j, field);			
			field.addCard(tmp);
		}
	}

	this.field.selectCard(4,4);
	this.field.selectCard(4,5);
	this.field.selectCard(5,4);
	this.field.selectCard(5,5);
	//this.callSelector();
	//this.field.selectCard(5,4);



}



function callSelector(){
	this.field.updateSelectable();
}


function timeUpdate(){
	
}