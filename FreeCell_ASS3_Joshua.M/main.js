const canvas = document.getElementById("canvas");

class FreeCellGame 
{
    constructor(canvasInput, numberOfTableaus = 8, numberOfFreeCells = 4)
    {
        this.deck = new Deck();
        this.canvas = canvasInput;
        this.ctx = this.canvas.getContext("2d");
        this.tableaus = [];
        this.freeCells = [];
        this.foundations = [];
        this.generateCardComponents(numberOfTableaus, numberOfFreeCells);

        this.updateCanvasSizeStart();

        requestAnimationFrame(this.mainGameLoop.bind(this));

        //Begin the game
        //window.setInterval(this.mainGameLoop, 100);
        //this.mainGameLoop();
    }

    updateCanvasSizeStart()
    {
        window.onload = window.onresize = function()   
        {
        this.generatePositions(0.4);
        this.canvas.width = window.innerWidth * 0.75;
        this.canvas.height = window.innerHeight * 0.8;
        }
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

    generatePositions(tableauHeight)
    {   

        //Creating positions for tableaus and cards within
        for(let i = 0; i < this.tableaus.length; i++)
        {
            //Values deciding offset 
            let tableauOffset =  0.05 * this.canvas.width;
            let emptySpace = 0.1 * this.canvas.width;

            //
            this.tableaus[i].x = tableauOffset + (this.canvas.width - emptySpace / this.tableaus.length) * i;
            this.tableaus[i].y = this.canvas.height * tableauHeight;
            
            for (let j = 0; j < this.tableaus[i].cards.length; j++)
            {
                let card = this.tableaus[i].cards[j];
                card.x = this.tableaus[i].x;
                card.width = this.canvas.width * 0.05;
                card.height = card.width * 1.4;
                
                card.y = this.tableaus[i].y + card.height * 0.4;
                
                this.tableaus[i].cards[j] = card;

            }
            console.log(this.tableaus)
        }
    }

    renderObjects(renderableObjects)
    {
        for(let card of renderableObjects)
        {
            console.log(card);
            card.x = 20;
            card.y = 20;
            //var cardElement = new Image(); 
            var cardElement = document.createElement("img");
            cardElement.src = "cards/" + card.getImageRef();

            this.ctx.beginPath();
            this.ctx.rect(20, 20, 150, 100);
            this.ctx.stroke();
            this.ctx.drawImage(cardElement,card.x, card.y, card.width, card.height);
        }
    }

    mainGameLoop()
    {
        this.updateDisplay();
        setTimeout(() => {
            requestAnimationFrame(this.mainGameLoop.bind(this));
        }, 100 );
        //update display 
        //generate hitBoxes
        //collect input
        //store clicks
        //After two clicks atempt to perform movement
    }
}
mainGameInstance = new FreeCellGame(canvas, 8,4);

