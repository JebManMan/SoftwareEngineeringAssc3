
const canvas = document.getElementById("canvas");

mainGameInstance = new FreeCellGame(canvas, 8,4);
resizeCanvas();

//Setting up slider and updating Text
var tableauSliderText = document.getElementById("tableauSliderText");
var tableauSlider = document.getElementById("tableauSlider");
tableauSlider.oninput = function (){
    tableauSliderText.innerHTML = "Number of Tableaus: " + tableauSlider.value.toString();
}

//Setting up slider and updating Text
var freeCellSlider = document.getElementById("freeCellSlider");
var freeCellSliderText = document.getElementById("freeCellSliderText");
freeCellSlider.oninput = function (){
    freeCellSliderText.innerHTML = "Number of FreeCells: " + freeCellSlider.value.toString();
}

//Linking reset button to resetButtonPressed function
var resetButton = document.getElementById("resetButton");
resetButton.addEventListener('click', resetButtonPressed);

//Resets the game with specified tableau and frecell numbers from sliders 
function resetButtonPressed()
{
    mainGameInstance.setUpGame(canvas,tableauSlider.value,freeCellSlider.value);
}

//Creating listener event to change canvas to match fix ratio of screen size
window.addEventListener('resize', resizeCanvas)

function resizeCanvas()
{
    //console.log('RESIZE');
    this.canvas.width = window.innerWidth * 0.75;
    this.canvas.height = window.innerHeight * 0.8;
    mainGameInstance.mainGameLoop();
}

//Linking player click to give game instance position of mouse and then update it through the mainGameLoop
canvas.addEventListener('mousedown', playerClicks)

function playerClicks(e)
{
    let canvasRect = canvas.getBoundingClientRect();
    let clickX = e.clientX - canvasRect.left;
    let clickY = e.clientY - canvasRect.top;
    mainGameInstance.updateMouseClickPosition(clickX, clickY);
    mainGameInstance.mainGameLoop();
}