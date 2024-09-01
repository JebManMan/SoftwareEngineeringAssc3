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
        this.generatePositions(0.25, 0.05);
        
        var renderableObjects = this.getRenderableCards();

        //console.log("renderable objects: " + renderableObjects)
        this.renderObjects(renderableObjects);
    }
    
    getRenderableCards()
    {
        //Adding card objects to renderableObjects
        let renderableObjects = []
        for (let freeCell of this.freeCells)
            {
                renderableObjects.push(freeCell.card);
            }
    
            for (let foundation of this.foundations)
            {
                renderableObjects.push(foundation.getTopCard());
            }
    
            for (let tableau of this.tableaus)
            {
                for (let card of tableau.cards)
                {
                    renderableObjects.push(card);
                }
            }
        return renderableObjects;
    }
    generatePositions(tableauHeight, freeCellAndFoundationHeight)
    {   
        //Creating positions for free cells and foundations
        var screenHalf = this.canvas.width/2;
        //Determines the distance from the sides of the sides of the canvas 
        var freeCellAndFoundationOffset = 0.05;

        for (let i = 0; i < this.freeCells.length; i++)
        {
            this.freeCells[i].x = screenHalf + freeCellAndFoundationOffset + (screenHalf - freeCellAndFoundationOffset / this.freeCells.length) * i
            this.freeCells[i].y = this.canvas.height * freeCellAndFoundationHeight;
            this.freeCells[i].width = this.canvas.width * 0.05;
            this.freeCells[i].height = card.width * 1.4;
        }

        for (let i = 0; i < this.foundations.length; i++)
        {
            /*
            card = this.foundations[i].getTopCard();
            card.x = freeCellAndFoundationOffset + (screenHalf - freeCellAndFoundationOffset / this.freeCells.length) * i
            card.y = this.canvas.height * freeCellAndFoundationHeight;
            card.width = this.canvas.width * 0.05;
            card.height = card.width * 1.4;
            this.foundations[i].cards[this.foundations.length-1] = card;
            */
        }
        


        //Creating positions for tableaus and cards within
        for(let i = 0; i < this.tableaus.length; i++)
        {
            //Values deciding offset 
            let tableauOffset =  0.075 * this.canvas.width;

            this.tableaus[i].x = tableauOffset + ((this.canvas.width - tableauOffset) / this.tableaus.length) * i;
            this.tableaus[i].y = this.canvas.height * tableauHeight;
            
            for (let j = 0; j < this.tableaus[i].cards.length; j++)
            {
                let card = this.tableaus[i].cards[j];
                card.x = this.tableaus[i].x;
                card.width = this.canvas.width * 0.05;
                card.height = card.width * 1.4;
                
                card.y = this.tableaus[i].y + (j * (card.height * 0.4));
                
                this.tableaus[i].cards[j] = card;
            }
        }
    }

    renderObjects(renderableObjects)
    {
        for(let card of renderableObjects)
        {
            console.log(card);
            //card.x = 20;
            //card.y = 20;
            //var cardElement = new Image(); 
            var cardElement = document.createElement("img");
            cardElement.src = "cards/" + card.getImageRef();
            this.ctx.drawImage(cardElement,card.x, card.y, card.width, card.height);
        }
    }

    updateCanvasSizeStart()
    {
        window.onload = window.onresize = function()   
        {
        this.canvas.width = window.innerWidth * 0.75;
        this.canvas.height = window.innerHeight * 0.8;
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

