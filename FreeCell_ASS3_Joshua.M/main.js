
window.onload = window.onresize = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.8;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class FreeCellGame 
{
    constructor()
    {
        this.deck = new Deck();
        this.canvas = document.getElementById("canvas");
        this.tableaus = []
        this.freeCells = []
        this.foundations = []
        dealCards();
    }

    dealCards(numberOfTableaus = 8, numberOfFreeCells = 4, numberOfFoundations = 4)
    {
        for (let i = 0; i<numberOfFoundations; i++)
        {
            this.foundations.push(new Tableau());
        }
    }

    updateDisplay()
    {
        
    }
}