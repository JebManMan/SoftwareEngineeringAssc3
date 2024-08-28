
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
        

        //Begin the game
        //window.setInterval(this.mainGameLoop, 100);
        this.mainGameLoop()
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
        
        for(let i = 0; i < 52; i++)
        {
            for(let tableau of this.tableaus)
            {
                let drawnCard = this.deck.drawCard();
                if (drawnCard != null)
                {
                    tableau.addCard(drawnCard);
                }   
            }
        }
        console.log(this.tableaus);
        
    }
    
    generateCardComponents(numberOfTableaus, numberOfFreeCells)
    {
        this.fillTableaus(numberOfTableaus);
        this.generateFreeCells(numberOfFreeCells);
    }

    updateDisplay()
    {
        this.generatePositions();
        let renderableObjects = [this.tableaus[0].getTopCard()];
        console.log(renderableObjects)
        this.renderObjects(renderableObjects);
    }

    generatePositions()
    {
        let x = 0;
    }

    renderObjects(renderableObjects)
    {
        for(let card of renderableObjects)
        {
            console.log(card);
            card.x = 100;
            card.y = 200;
            let cardElement = new Image(); //document.createElement("img");
            cardElement.src = card.getImageRef();

            this.ctx.drawImage(cardElement,card.x, card.y);
        }
    }

    mainGameLoop()
    {
        this.updateDisplay();
    
        //update display 
        //generate hitBoxes
        //collect input
        //store clicks
        //After two clicks atempt to perform movement
    }
}

mainGameInstance = new FreeCellGame(8,4);