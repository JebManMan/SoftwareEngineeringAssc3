
window.onload = window.onresize = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.8;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class FreeCellGame 
{
    constructor(numberOfTableaus = 8, numberOfFreeCells = 4)
    {
        this.deck = new Deck();
        this.canvas = document.getElementById("canvas");
        this.tableaus = [];
        this.freeCells = [];
        this.foundations = [];
        this.generateCardComponents(numberOfTableaus, numberOfFreeCells);
    }

    geneateFoundations()
    {
        for(let i = 0; i < 4; i++)
        {
            this.foundations.push("")
        }
    }

    generateFreeCells(numberOfFreeCells)
    {
        for(let i = 0; i< numberOfFreeCells; i++)
        {
            this.freeCells.push([]);
        }
    }

    fillTableaus(numberOfTableaus)
    {
        //Generating Tableaus
        for (let i = 0; i<numberOfTableaus; i++)
        {
            this.tableaus.push(new Tableau());
        }
        
        //Filling Tableaus with cards
        while (this.deck.isEmpty() != true)
        {
            for(let tableau of this.tableaus)
            {
                tableau.cards.push(this.deck.drawCard())
            }
        }
    }
    
    generateCardComponents()
    {

    }

    updateDisplay()
    {
        
    }
}

mainGameInstance = FreeCellGame(8,4)