

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

	this.field = new Field();
	this.field.init();
	
	window.addEventListener('resize', ()=>{
		this.field.draw();
	});

	


}



function callSelector(){
	this.field.updateSelectable();
}


function timeUpdate(){
	
}