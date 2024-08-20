
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
        this.ctx = this.canvas.getContext("2d");
        this.tableaus = [];
        this.freeCells = [];
        this.foundations = [];
        this.generateCardComponents(numberOfTableaus, numberOfFreeCells);
    }

    geneateFoundations()
    {
        let suits = ["H", "S", "C", "D"];
        for(let suit in suits)
        {
            this.foundations.push(new Foundation(suit));
        }
    }

    generateFreeCells(numberOfFreeCells)
    {
        for(let i = 0; i< numberOfFreeCells; i++)
        {
            this.freeCells.push(new FreeCell());
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
        while (true)
        {
            for(let tableau of this.tableaus)
            {
                if (this.deck.isEmpty())
                {
                    break;
                }
                tableau.addCard(this.deck.drawCard())
                console.log(tableau.cards);
            }
        }
    }
    
    generateCardComponents(numberOfTableaus, numberOfFreeCells)
    {
        this.fillTableaus(numberOfTableaus);
        this.generateFreeCells(numberOfFreeCells);
    }

    updateDisplay()
    {
        generatePositions();
        let renderableObjects = [];
        renderObjects(renderableObjects);
    }

    generatePositions()
    {
        
    }

    renderObjects(renderableObjects)
    {
        for(let object in renderableObjects)
        {
            this.ctx.drawImg(object.getImageRef().img,object.x, object.y);
        }
    }

    mainGameLoop()
    {
        //update display 
        //generate hitBoxes
        //collect input
        //store clicks
        //After two clicks atempt to perform movement
    }
}

mainGameInstance = new FreeCellGame(8,4);