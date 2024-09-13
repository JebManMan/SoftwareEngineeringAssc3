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

        console.log(this.tableaus[0].cards[0]);

        //this.foundations[0].cards.push(newFoundationCopy);
        //this.freeCells[0].card = newFoundationCopy;

        //Begin the game via run the main game loop
        requestAnimationFrame(this.mainGameLoop.bind(this));
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
        this.geneateFoundations();
    }

    updateDisplay()
    {
        this.generatePositions(0.25, 0.05);
        
        var renderableObjects = this.getRenderableCards();

        //console.log("renderable objects: " + renderableObjects)
        for (let card of renderableObjects)
        {
            this.renderCard(card);
        }
        this.renderBoundryFreeCellAndFoundations()
    }
    
    getRenderableCards()
    {
        //Adding card objects to renderableObjects
        let renderableObjects = [];
        for (let freeCell of this.freeCells)
            {
                if (freeCell.isEmpty() == false)
                {
                    //freeCell.card.x = freeCell.x;
                    //freeCell.card.y = freeCell.y;

                    renderableObjects.push(freeCell.card);
                }
            }
    
            for (let foundation of this.foundations)
            {
                if (foundation.isEmpty() == false)
                {
                    renderableObjects.push(foundation.getTopCard());
                }
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
        var screenHalf = this.canvas.width / 2;
        //Determines the distance from the sides of the sides of the canvas 
        var freeCellAndFoundationOffset = 0.05 * this.canvas.width;

        //Determining free Cell position and inheriting it to any cards within 
        for (let i = 0; i < this.freeCells.length; i++)
        {
            this.freeCells[i].x = screenHalf + freeCellAndFoundationOffset + (((screenHalf - freeCellAndFoundationOffset) / this.freeCells.length) * i);
            this.freeCells[i].y = this.canvas.height * freeCellAndFoundationHeight;
            this.freeCells[i].cardInheritPosition();
            console.log("The Post Inherited" + this.freeCells[i].card);
        }

        for (let i = 0; i < this.foundations.length; i++)
        {
            this.foundations[i].x = freeCellAndFoundationOffset + (((screenHalf - freeCellAndFoundationOffset) / this.foundations.length) * i)
            this.foundations[i].y = this.canvas.height * freeCellAndFoundationHeight;
            this.foundations[i].topCardInheritPosition();
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
                card.y = this.tableaus[i].y + (j * (card.height * 0.4));
                
                this.tableaus[i].cards[j] = card;
            }
        }
    }

    renderCardsMakeHitboxes(renderableObjects)
    {
        /*
        var hitBoxes = [];
        for(let card of renderableObjects)
        {
            this.renderCard(card);
            hitBoxes.append(this.getCardHitbox(card));
        }
        */
    }

    getCardHitbox(card)
    {
       // var hitBox.x 
    }

    renderCard(card)
    {
        card.width = this.canvas.width * 0.05;
        card.height = card.width * 1.4;

        //var cardElement = new Image(); 
        var cardElement = document.createElement("img");
        cardElement.src = "cards/" + card.getImageRef();
        this.ctx.drawImage(cardElement,card.x, card.y, card.width, card.height);
    }

    renderBoundryFreeCellAndFoundations()
    {
        console.log(this.freeCells)
        console.log(this.foundations)
        var boundryWidth = 0.05 * this.canvas.width;
        var boundryHeight = boundryWidth * 1.4;
        for(let freeCell of this.freeCells)
        {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "blue";
            this.ctx.rect(freeCell.x, freeCell.y, boundryWidth,boundryHeight);
            this.ctx.stroke();
        }

        for(let foundation of this.foundations)
        {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "red";
            this.ctx.rect(foundation.x, foundation.y, boundryWidth,boundryHeight);
            this.ctx.stroke();
        }
    }

    generateHitBoxes()
    {

    }


    moveCard(cardID1, endID)
    {
        //card 1 
        //card 2 
        /*
        card
        var isTableau = false;
        var isFoundation = false;
        var isFreeCell = false;

        if (cardID1[0] = "T")
        {
            isTableau = true;
        }

        if (cardID1[0] = "FR")
        {
            isFreeCell = true;
        }

        if (cardID1[0] = "FO")
        {
            isFoundation = true;
        }
        
        
        
        */
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

