var canvasHeight = 800;
var canvasWidth = 800;
var currentColour = "rgba(0, 0, 0, 0.5)";

var refreshListener = refresh.addEventListener("click", clearCanvas);
var enablePaintListener = window.addEventListener("mousedown", removeCanvasOverlay);
var disablePaintListener = window.addEventListener("mouseup", addCanvasOverlay);

//Only want paint to be applied if user is holding down m1. Created an invisible overlay that blocks user mousing over the canvas until m1 is pressed.
//-> Create overlay. Position ontop of canvas
//-> Delete this overlay if mouse is clicked anywhere in the window. Put it back when mouse is released.
function addCanvasOverlay(){
	//Only runs if no overlay exists
	if (!document.querySelector(".overlay")){
		let overlay = document.createElement("div");
		let canvas = document.querySelector(".canvasContainer");
		
		if (canvas){
			overlay.setAttribute("style",`height: ${canvasHeight}px; 
										  width: ${canvasWidth}px; 
										  background-color: rgba(255, 255, 255, 0); 
										  position: absolute; 
										  z-index: 1000;`);
			overlay.setAttribute("class", "overlay");
			canvas.appendChild(overlay);
		}
	}
}

function removeCanvasOverlay(){
	let overlay = document.querySelector(".overlay");
	overlay.parentNode.removeChild(overlay);
}

//Deletes the current canvas and replaces it with a new one
function clearCanvas(){
	//Deleting any existing canvases
	var existingCanvases = document.querySelectorAll(".canvasContainer");

	if(existingCanvases!=null){
		//Should only ever be one, but we'll use a loop to be on the safe side.
		for(let i=0; i<existingCanvases.length; i++){
			let currentCanvas = existingCanvases[i];
			currentCanvas.parentNode.removeChild(currentCanvas);
		}
	}
	createCanvas();
	addCanvasOverlay();
	createPaintMenu();
}

//Fills the page-area (at time of button press) with 16x16px squares
function createCanvas(){
	let numberOfDivs = (canvasHeight/16) * (canvasWidth/16);
	
	//Feel that it's better to create node and append divs to it here.
	//Worried that browser will want to redraw page for every div if we add to a live element
	let canvasContainer = document.createElement("div");
	canvasContainer.setAttribute("class", "canvasContainer");
	
	for(let i=0;i<numberOfDivs;i++){
		let newDiv = document.createElement("div");
		newDiv.setAttribute("class", "squares");
		newDiv.onmouseover = function(){newDiv.setAttribute("style",`background-color: ${currentColour};`)};
		canvasContainer.appendChild(newDiv);
	}
	document.querySelector("body").appendChild(canvasContainer);
}

//Functions for paint menu items (just colour selection for now)

//Builds the paint menu and adds below canvas
function createPaintMenu(){
	let paintMenu;
	let colourContainer;
	
	//main container div
	paintMenu = document.createElement("div");
	paintMenu.setAttribute("class", "paintMenu");
	
	//div for containing paint colours
	colourContainer = document.createElement("div");
	colourContainer.setAttribute("class", "colourDiv");
	createColourRadio("red", colourContainer);
	createColourRadio("blue", colourContainer);
	
	paintMenu.appendChild(colourContainer);
	
	document.querySelector(".canvasContainer").appendChild(paintMenu);
}

function createColourRadio(colour, node){
	let colourRadio = document.createElement("input");
	
	colourRadio.setAttribute("type", "radio");
	colourRadio.setAttribute("class", "colourRadio");
	colourRadio.setAttribute("style", `background-color: ${colour};`);
	colourRadio.setAttribute("name", "colour");
	colourRadio.onclick = function(){currentColour = `${colour}`;};
	
	node.appendChild(colourRadio);
}

