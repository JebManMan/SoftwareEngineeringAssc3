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

        this.cardsInstance = [];

        this.playerClickX = null;
        this.playerClickY = null;

        //Should be multiplied by card height
        this.tableauCardDepthOffset = 0.4;

        console.log(this.tableaus[0].cards[0]);

        //this.foundations[0].cards.push(newFoundationCopy);
        //this.freeCells[0].card = newFoundationCopy;

        //Begin the game via run the main game loop
        
        requestAnimationFrame(this.mainGameLoop.bind(this));
    }

    updateMouseClickPosition(x,y)
    {
        this.playerClickX = x;
        this.playerClickY = y;
        console.log(this.playerClickX + "  " + this.playerClickY)
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


    updateTableausFoundationsFreeCells()
    {
        this.generatePositions(0.25, 0.05)
    }

    updateDisplay()
    {
        //console.log("renderable objects: " + renderableObjects)
        for (let card of this.cardsInstance)
        {
            this.renderCard(card);
        }
        this.renderBoundryFreeCellAndFoundations()
    }
    
    getMainArrayCards()
    {
        //Adding card objects to renderableObjects
        let mainArray = [];
        for (let freeCell of this.freeCells)
            {
                if (freeCell.isEmpty() == false)
                {
                    //freeCell.card.x = freeCell.x;
                    //freeCell.card.y = freeCell.y;

                    mainArray.push(freeCell.card);
                }
            }
    
            for (let foundation of this.foundations)
            {
                if (foundation.isEmpty() == false)
                {
                    mainArray.push(foundation.getTopCard());
                }
            }
    
            for (let tableau of this.tableaus)
            {
                for (let card of tableau.cards)
                {
                    mainArray.push(card);
                }
            }
        return mainArray;
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
            //console.log("The Post Inherited" + this.freeCells[i].card);
            if (this.freeCells[i].card != null)
            {
                this.freeCells[i].card.freeCellNumber = i;
                this.freeCells[i].card.isInFreeCell = true;
            }
        }

        //Giving the 
        for (let i = 0; i < this.foundations.length; i++)
        {
            this.foundations[i].x = freeCellAndFoundationOffset + (((screenHalf - freeCellAndFoundationOffset) / this.foundations.length) * i)
            this.foundations[i].y = this.canvas.height * freeCellAndFoundationHeight;
            this.foundations[i].topCardInheritPosition();
            if (this.foundations[i].cards.length > 0)
            {
                for (let j = 0; j < this.foundations.length; j++)
                {
                    this.foundations[i].cards[j].foundationNumber = i;
                    this.foundations[i].cards[j].foundationInternalPosition = j;
                    this.foundations[i].cards[j].isInFoundation = true;
                }
            }
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
                card.isInTableau = true;
                card.tableauNumber = i;
                card.tableauInternalPosition = j;
                card.x = this.tableaus[i].x;
                card.y = this.tableaus[i].y + (j * (card.height * this.tableauCardDepthOffset));
                
                this.tableaus[i].cards[j] = card;
            }
        }
    }

    getCardHitbox(card)
    {
       // var hitBox.x 
    }

    clearCardsWithinTableausFreeCellsFoundationsArrays()
    {
        for(let tableau of this.tableaus)
        {
            tableau.cards = [];
            /*
            for(let card of tableau.cards)
            {
                //console.log("card be null");
                card = null;
            }
            */
        }

        for(let foundation of this.foundations)
        {
            for(let card of foundation.cards)
            {
                card = null;
            }
        }

        for(let freeCell of this.freeCells)
        {
            freeCell.card = null;
        }
    }

    pushCardInstanceChanges()
    {
        this.clearCardsWithinTableausFreeCellsFoundationsArrays();
        console.log(this.tableaus);
        console.log(this.cardsInstance);
        for (let card of this.cardsInstance)
        {
            if (card.isInFoundation)
            {
                this.foundations[card.foundationNumber] = card;
            }

            else if (card.isInTableau)
            {
                console.log("im gere")
                this.tableaus[card.tableauNumber].cards[card.tableauInternalPosition] = card;
            }

            else if (card.isInFreeCell)
            {
                this.freeCells[card.freeCellNumber] = card;
            }
        }
        console.log(this.tableaus);
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

    //Assuming x1 and y1 to be upper leftmost points
    renderBoundryBetweenTwoPoints(x1,y1,x2,y2)
    {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "purple";
        this.ctx.rect(x1,y1,Math.abs(x2 - x1), Math.abs(y2-y1));
        this.ctx.stroke();
    }

    renderBoundryFreeCellAndFoundations()
    {
        //console.log(this.freeCells)
        //console.log(this.foundations)
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

    generateCardInstanceHitBoxes()
    {
        //Hitbox will be an array of two arrays each which represent 1 xy coordinate
        for (let card of this.cardsInstance)
        {  
            if (card.isInTableau)
            {
                var topLeftPoint = [card.x, card.y]
                var bottemRightPointX = card.x + card.width;

                if (card.tableauInternalPosition != this.tableaus[card.tableauNumber].cards.length - 1)
                {
                    var bottemRightPointY = card.y + (card.height * this.tableauCardDepthOffset);
                }
                else
                {
                    var bottemRightPointY = card.y + card.height;
                }

                var bottemRightPoint = [bottemRightPointX, bottemRightPointY]
                card.hitbox = [topLeftPoint, bottemRightPoint];
            } 
            
            else
            {
                card.hitbox = [[card.x, card.y],[card.x + card.width, card.y + card.height]]
            }
        }
    }
    deSelectOtherCards()
    {
        for (let card of this.cardsInstance)
        {
            card.isSelected = false;
        }
    }
    selectClickedCard()
    {
        for (let card of this.cardsInstance)
        {
            let withinXField = false;
            let withinYField = false;

            if (this.playerClickX > card.hitbox[0][0] && this.playerClickX < card.hitbox[1][0])
            {
                withinXField = true;
            }

            if (this.playerClickY > card.hitbox[0][1] && this.playerClickY < card.hitbox[1][1])
            {
                withinYField = true;
            }

            if (withinXField == true && withinYField == true)
            {
                this.cardsInstance[2].tableau = 5;

                this.playerClickX = null;
                this.playerClickY = null;

                if (this.getSelectedCard() == null)
                {   
                    card.isSelected = true;
                }

                else{
                    //console.log("TO BE MOVED TO")
                    //console.log(card);
                    //console.log("CARDS INSTANCE FORM OTHER THINGO");
                    this.moveCard(this.getSelectedCard(), card);
                    console.log(this.getSelectedCard());
                    //console.log(this.cardsInstance[this.findCardTemporaryArrayNumberFromSuitValue(selectedCard.suit, selectedCard.value)].tableauNumber)
                    //this.cardsInstance[this.findCardTemporaryArrayNumberFromSuitValue(selectedCard.suit, selectedCard.value)] = this.moveCard(selectedCard, card);
                    this.deSelectOtherCards();
                }
            }
        }
    }

    getSelectedCard()
    {
        for (let card of this.cardsInstance)
        {
            if (card.isSelected)
            {
                return card;
            }
        }
        return null;
    }

    highlightSelectedCardsHitbox()
    {
        if (this.getSelectedCard() != null)
        {
            var selectedHitbox = this.getSelectedCard().hitbox;
            this.renderBoundryBetweenTwoPoints(selectedHitbox[0][0],selectedHitbox[0][1],selectedHitbox[1][0],selectedHitbox[1][1]);
        }
    }

    giveCardsArrayIndexAsAtribute()
    {
        for (let i = 0; i < this.cardsInstance.length; i++)
        {
            this.cardsInstance[i].cardIndex = i;
        }
    }

    moveCard(movingCard, goalCard)
    {
        if (movingCard.isInTableau != true)
        {
        this.singleCardMove(movingCard,goalCard);
        }
        else if (this.tableaus[movingCard.tableauNumber].length - 1 != movingCard.tableauInternalPosition)
        {
            this.multipleCardMovement(movingCard,goalCard);
        }
    }

    //Visualy at bottom highest in internal position
    getBelowCardInTableau(inputCard)
    {
        this.getCardDistanceBelow(1);
    }

    getAboveCardInTableau(inputCard)
    {
        this.getCardDistanceBelow(-1);    
    }

    getInstanceArrayId 

    //Negative Values to move to view values above card
    getCardDistanceBelow(inputCard, shiftsDown)
    {
        return this.tableaus[inputCard.tableauNumber][inputCard.tableauInternalPosition + shiftsDown];
    }

    multipleCardMovement(movingCard, goalCard)
    {
        let numberOfMoves = (this.tableaus[movingCard.tableauNumber].length - 1) - movingCard.tableauInternalPosition;
        for (let i = 0; i < numberOfMoves; i++)
        {
            this.singleCardMove()
        }
    }

    singleCardMove(movingCard,goalCard)
    {
        if (goalCard.isInFoundation)
            {
                movingCard.isInFoundation = true;
                movingCard.foundationNumber = goalCard.foundationNumber;
                movingCard.foundationInternalPosition = goalCard.foundationInternalPosition + 1;
            }
    
            else if (goalCard.isInFreeCell)
            {
                movingCard.isInFreeCell = true;
                movingCard.freeCellNumber = goalCard.freeCellNumber;
            }
            
            else if (goalCard.isInTableau)
            {
                //this.cardsInstance[this.cardsInstance.length - 1].tableauNumber = 6;
                console.log("IS IN Tableu");
                movingCard.isInTableau = true;
                console.log(goalCard.tableauNumber);
                movingCard.tableauNumber = goalCard.tableauNumber;
                console.log(movingCard.tableauNumber);
                movingCard.tableauInternalPosition = goalCard.tableauInternalPosition + 1;
            }
    
            console.log("comparision")
            console.log(goalCard);
            console.log(movingCard);
            //return (movedMovingCard);
    }

    getRandomInt(min,max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    shuffleCards(numberOfSwaps)
    {
        for(let i = 0; i< numberOfSwaps; i++)
        {   
            let index1 = this.getRandomInt(0, this.cardsInstance.length - 1);
            let index2 = this.getRandomInt(0, this.cardsInstance.length - 1);
            let card1 = this.cardsInstance[index1];
            let card2 = this.cardsInstance[index2];
            this.cardsInstance[index1].tableauNumber = card2.tableauNumber;
            this.cardsInstance[index2].tableauNumber = card1.tableauNumber;
            this.cardsInstance[index1].tableauInternalPosition = card2.tableauInternalPosition;
            this.cardsInstance[index2].tableauInternalPosition = card1.tableauInternalPosition;
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

    clearCanvas()
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = "green"
        this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fill()

    }

    mainGameLoop()
    {
        this.updateTableausFoundationsFreeCells();

        this.clearCanvas();
        this.updateDisplay();

        this.cardsInstance = this.getMainArrayCards();
        
        this.giveCardsArrayIndexAsAtribute();

        this.generateCardInstanceHitBoxes();

        this.selectClickedCard();

        //this.shuffleCards(20);
        
        
        //console.log(this.getSelectedCard());

        this.highlightSelectedCardsHitbox();

        this.pushCardInstanceChanges();


        
        
        setTimeout(() => {
            requestAnimationFrame(this.mainGameLoop.bind(this));
        }, 400 );
        //update display 
        //generate hitBoxes
        //collect input
        //store clicks
        //After two clicks atempt to perform movement
    }
}
mainGameInstance = new FreeCellGame(canvas, 8,4);



canvas.addEventListener('mousedown', function(e) 
    {
        let canvasRect = canvas.getBoundingClientRect();
        let clickX = e.clientX - canvasRect.left;
        let clickY = e.clientY - canvasRect.top;
        mainGameInstance.updateMouseClickPosition(clickX, clickY);
    })
