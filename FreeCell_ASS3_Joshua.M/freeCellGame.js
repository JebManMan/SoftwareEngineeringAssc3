class FreeCellGame 
{
    //Quick note may refer to freeCells, foundations and tableaus all as card piles
    constructor(canvasInput, numberOfTableaus = 8, numberOfFreeCells = 4)
    {
        this.setUpGame(canvasInput, numberOfTableaus, numberOfFreeCells);
    }

    setUpGame(canvasInput,numberOfTableaus, numberOfFreeCells)
    {
        this.deck = new Deck();
        this.canvas = canvasInput;
        this.ctx = this.canvas.getContext("2d");
        this.tableaus = [];
        this.freeCells = [];
        this.foundations = [];
        this.generateCardComponents(numberOfTableaus, numberOfFreeCells);

        this.cardsInstance = [];

        this.playerClickX = null;
        this.playerClickY = null;

        this.tableauCardDepthOffset = 0.4;

        this.maxMoveingCardsAtOnce = 4;

        this.updateTableausFoundationsFreeCells();

        this.mainGameLoop();

        this.rulesEnabled = true;
    }

    updateMouseClickPosition(x,y)
    {
        this.playerClickX = x;
        this.playerClickY = y;
    }

    geneateFoundations()
    {
        let suits = ["H", "S", "C", "D"];
        for(let suit of suits)
        {
            this.foundations.push(new Foundation(suit));
        }

        for (let foundation of this.foundations)
        {
            foundation.cards.push(new Card("D","K",false,true));
        }
    }

    generateFreeCells(numberOfFreeCells)
    {
        for(let i = 0; i< numberOfFreeCells; i++)
        {
            this.freeCells.push(new FreeCell());
        }

        //AddingPlaceholderInteractables 
        for(let i = 0; i< this.freeCells.length; i++)
        {
            this.freeCells[i].cards.push(new Card("D","K",false,true));
        }
        console.log("FIRST PRING");
        console.log(this.freeCells);
    }

    fillTableaus(numberOfTableaus)
    {
        //Generating Tableaus
        for (let i = 0; i<numberOfTableaus; i++)
        {
            this.tableaus.push(new Tableau());
        }

        //AddingPlaceholderCards
        for (let tableau of this.tableaus)
        {
            tableau.cards.push(new Card("H","K",false,true));
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
    }
    
    generateCardComponents(numberOfTableaus, numberOfFreeCells)
    {
        this.fillTableaus(numberOfTableaus);
        this.geneateFoundations();
        this.generateFreeCells(numberOfFreeCells);
    }

    updateTableausFoundationsFreeCells()
    {
        this.generatePositions(0.25, 0.05);
    }

    updateDisplay()
    {
        for (let card of this.cardsInstance)
        {
            this.renderCard(card);
        }
        this.renderBoundryFreeCellAndFoundations()
        this.renderPileTitles();
    }

    renderPileTitles()
    {
        let halfWidth = this.canvas.width / 2;
        let textHeight = this.canvas.height * 0.04;
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = 'gold';
        this.ctx.fillText("FreeCells", halfWidth + (halfWidth/3), textHeight);
        this.ctx.fillText("Foundations", halfWidth/3, textHeight);
    }
    
    getMainArrayCards()
    {
        //Extracts cards from several array card piles into one singular array
        let mainArray = [];
        for (let freeCell of this.freeCells)
            {
                for (let card of freeCell.cards)
                    {
                        mainArray.push(card);
                    }
            }

        for (let foundation of this.foundations)
            {
                if (foundation.isEmpty() == false)
                {
                    for (let card of foundation.cards)
                    {
                        mainArray.push(card);
                    }
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
            this.freeCells[i].cardsInheritPosition();
            //console.log("The Post Inherited" + this.freeCells[i].card);
            for (let j = 0; j < this.freeCells[i].cards.length; j++)
            {
                this.freeCells[i].cards[j].isInFreeCell = true;
                this.freeCells[i].cards[j].freeCellNumber = i;
                this.freeCells[i].cards[j].freeCellInternalPosition = j;
            }
        }

        //Giving the cards in this.foundation x and y position and thier positions within the array as atributes 
        for (let i = 0; i < this.foundations.length; i++)
        {
            this.foundations[i].x = freeCellAndFoundationOffset + (((screenHalf - freeCellAndFoundationOffset) / this.foundations.length) * i)
            this.foundations[i].y = this.canvas.height * freeCellAndFoundationHeight;
            this.foundations[i].topCardInheritPosition();
            if (this.foundations[i].cards.length > 0)
            {
                for (let j = 0; j < this.foundations[i].cards.length; j++)
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

                card.width = this.canvas.width * 0.05;
                card.height = card.width * 1.4;

                card.isInTableau = true;
                card.tableauNumber = i;
                card.tableauInternalPosition = j;
                card.x = this.tableaus[i].x;
                card.y = this.tableaus[i].y + (j * (card.height * this.tableauCardDepthOffset));
                
                this.tableaus[i].cards[j] = card;
            }
        }
    }

//Emptys out the arrays within all card piles
    clearCardsWithinTableausFreeCellsFoundationsArrays()
    {
        for(let tableau of this.tableaus)
        {
            tableau.cards = [];
        }

        for(let foundation of this.foundations)
        {
            foundation.cards = [];
        }

        for(let freeCell of this.freeCells)
        {
            freeCell.cards = [];
        }
    }

    //wipes the array forms of card piles and fills them with the posible altered cards from the cardsInstance
    pushCardInstanceChanges()
    {
        this.clearCardsWithinTableausFreeCellsFoundationsArrays();
        for (let card of this.cardsInstance)
        {
            if (card.isInFoundation)
            {
                this.foundations[card.foundationNumber].cards[card.foundationInternalPosition] = card;
            }
            else if (card.isInTableau)
            {
                this.tableaus[card.tableauNumber].cards[card.tableauInternalPosition] = card;
            }
            else if (card.isInFreeCell)
            {
                this.freeCells[card.freeCellNumber].cards[card.freeCellInternalPosition] = card;
            }
        }
    }

    renderCard(card)
    {
        card.width = this.canvas.width * 0.05;
        card.height = card.width * 1.4;

        //var cardElement = new Image(); 
        var cardElement = document.createElement("img");
        cardElement.src = "cards/" + card.getImageRef();
        if (card.isPlaceholder == false)
        {
            this.ctx.drawImage(cardElement,card.x, card.y, card.width, card.height);
        }
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

    getNumberOfEmptyTableaus()
    {
        var numberOfEmptyTableaus = 0;
        for (let tableau of this.tableaus)
        {
            if (tableau.isEmptyExcludingPlaceholders())
            {
                numberOfEmptyTableaus = numberOfEmptyTableaus + 1;
            }
        }
        return numberOfEmptyTableaus;
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

    removeHitboxesFromPlaceholderCardsInFreeCells()
    {
        for (let card of this.cardsInstance)
        {
            if (card.isInFreeCell)
            {
                if (this.freeCells[card.freeCellNumber].freeToMoveCardIn() == false)
                {
                    if (card.isPlaceholder == true)
                    {
                        card.hitbox = [[0,0],[0,0]];
                    }
                }
                
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

                if(this.getSelectedCard() == card)
                {
                    this.deSelectOtherCards();
                }

                else if (this.getSelectedCard() == null)
                {   
                    if (card.isPlaceholder == false)
                    {
                    card.isSelected = true;
                    }
                }

                else{
                    this.moveCard(this.getSelectedCard(), card);
                    //console.log(this.getSelectedCard());
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

    foundationRuleCheck(inputCard,goalCard)
    {
        var viableMove = true;
        if (inputCard.getValue() == (this.foundations[goalCard.foundationNumber].getHighestValue() + 1) || inputCard.getValue() == 1)
        {
            //console.log(this.tableaus[goalCard.foundationNumber].suit)
            if (inputCard.getSuit() == this.foundations[goalCard.foundationNumber].getSuit())
            {
                viableMove = true;
            }
            else{
                viableMove = false;
            }
        }
        else{
            viableMove = false;
        }
        return(viableMove);
    }

    tableauRuleCheck(inputCard,goalCard)
    {   
        var viableMove = true;
        if (goalCard.isPlaceholder != true)
        {
            if (inputCard.getColor() == goalCard.getColor())
            {
                viableMove = false;
            }
            else if (inputCard.getValue() != goalCard.getValue() - 1)
            {
                viableMove = false;
            }
        }
        return(viableMove);
    }

    cardIsBottomOfTableau(movingCard)
    {
        var cardIsBottomOfTableau = false;
        if (this.tableaus[movingCard.tableauNumber].cards.length - 1 == movingCard.tableauInternalPosition)
        {
            cardIsBottomOfTableau = true;
        }
        return cardIsBottomOfTableau;
    }

    //Atempts to move movingCard to beneth/above goalCard determing if the move is generaly posible or if its multistep move
    moveCard(movingCard, goalCard)
    {   
        if (movingCard.isInTableau != true || goalCard.isInFoundation || goalCard.isInFreeCell)
        {
            if (movingCard.isInTableau)
            {
                if (this.cardIsBottomOfTableau(movingCard))
                {
                    this.singleCardMove(movingCard,goalCard);
                }
            }
            else
                {
                    this.singleCardMove(movingCard,goalCard);
                }
        }
        
        else if ((this.cardIsBottomOfTableau(movingCard) == false) && this.cardIsBottomOfTableau(goalCard))
        {
            this.multipleCardMovement(movingCard,goalCard);
        }
        else if(this.cardIsBottomOfTableau(goalCard)){
            this.singleCardMove(movingCard,goalCard);
        }
    }

    //Honestly a kinda odd function but sometimes its easier to get the card from the array form of tableaus but you have to change the same card that is within the cards instance so you need to get that reference you know
    getInstanceArrayConnectedCardFromCard(inputCard)
    {
        for(let card of this.cardsInstance)
        {
            if (card.getSuit() == inputCard.getSuit() && card.getValue() == inputCard.getValue())
            {
                return card;
            }
        }
    }

    //detemines whether a given array is both decreasing in value and alternating in colour returning true or false
    alternatingDecreasingValue(cardArray)
    {
        console.log(cardArray);
        var cardArrayIsAlternatingAndDecreasing = true;
        for (let i = 1; i < cardArray.length; i++)
        {
            if (cardArray[i].getColor() == cardArray[i-1].getColor() || cardArray[i].getValue() != cardArray[i-1].getValue() -1)
            {
                cardArrayIsAlternatingAndDecreasing = false;
            }
        }
        return cardArrayIsAlternatingAndDecreasing;
    }

    //Takes two cards and changes the position of the moving card and all bellow it to the goalCard
    multipleCardMovement(movingCard,goalCard)
    {
        if (this.tableauRuleCheck(movingCard,goalCard) )
        {
            var numberOfMoves = ((this.tableaus[movingCard.tableauNumber].cards.length) - movingCard.tableauInternalPosition);
            var movingCards = [];
            for(let i = 0; i < numberOfMoves; i++)
            {
                movingCards.push(this.tableaus[movingCard.tableauNumber].cards[movingCard.tableauInternalPosition + i]);
            }
            if (movingCards.length <= this.maxMoveingCardsAtOnce && this.alternatingDecreasingValue(movingCards))
            {
                for (let i = 0; i < movingCards.length; i++)
                {
                    this.getInstanceArrayConnectedCardFromCard(movingCards[i]).tableauNumber = goalCard.tableauNumber;
                    this.getInstanceArrayConnectedCardFromCard(movingCards[i]).tableauInternalPosition = goalCard.tableauInternalPosition + i + 1;
                }
                this.allowGameUpdate = true;
            }
        }
    }

    freeCellRuleCheck(movingCard, goalCard)
    {
        var moveLegal = true;
            if (this.freeCells[goalCard.freeCellNumber].freeToMoveCardIn() == false)
            {
                moveLegal = false;
            }
        //console.log(moveLegal);
        return (moveLegal);
    }


    singleCardMove(movingCard,goalCard)
    {
        if (goalCard.isInFoundation && this.foundationRuleCheck(movingCard,goalCard))
            {
                movingCard.clearCardPosition();
                movingCard.isInFoundation = true;
                movingCard.foundationNumber = goalCard.foundationNumber;
                movingCard.foundationInternalPosition = goalCard.foundationInternalPosition + 1;
            }
    
            else if (goalCard.isInFreeCell && this.freeCellRuleCheck(movingCard,goalCard))
            {
                movingCard.clearCardPosition();
                movingCard.isInFreeCell = true;
                movingCard.freeCellNumber = goalCard.freeCellNumber;
                movingCard.freeCellInternalPosition = goalCard.freeCellInternalPosition + 1;
            }
            
            else if (goalCard.isInTableau && this.tableauRuleCheck(movingCard,goalCard))
            {
                if (movingCard.tableauNumber != goalCard.tableauNumber)
                {
                    movingCard.clearCardPosition();
                    //this.cardsInstance[this.cardsInstance.length - 1].tableauNumber = 6;
                    movingCard.isInTableau = true;
                    movingCard.tableauNumber = goalCard.tableauNumber;
                    movingCard.tableauInternalPosition = goalCard.tableauInternalPosition + 1;
                }
            }
            //return (movedMovingCard);
    }

    clearCanvas()
    {
        this.ctx.beginPath();
        //let gradient = this.ctx.createLinearGradient(0,0,0,this.canvas.height);
        let gradient = this.ctx.createRadialGradient(this.canvas.width/2,this.canvas.height/2,this.canvas.height/3,this.canvas.width/2,this.canvas.height/2,this.canvas.height*1.25);
        gradient.addColorStop(0, "green");
        gradient.addColorStop(1, "lightgreen");
        this.ctx.fillStyle = gradient;
        this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fill()

    }

    updateNumberOfMaxMoves()
    {
        var emptyFreeCells = 0;
        for (let freeCell of this.freeCells)
        {
            if (freeCell.freeToMoveCardIn())
            {
                emptyFreeCells = emptyFreeCells + 1;
            }
        }
        this.maxMoveingCardsAtOnce = ((2**this.getNumberOfEmptyTableaus())*(emptyFreeCells + 1));
    }

    winCheck()
    {   
        playerWins = false;
        var cardsInFoundations = 0
        for(let card of this.cardsInstance)
        {
            if (card.isPlaceholder == false)
            {
                if (card.isInFoundation)
                {
                    cardsInFoundations = cardsInFoundations + 1;
                }
            }
        }
        if (cardsInFoundations >= 52)
        {
            playerWins = true;
        }
        return playerWins;
    }

    displayWin()
    {
        this.ctx.font = "70px Arial";
        this.ctx.fillStyle = 'orange';
        this.ctx.fillText("YOU WIN", this.canvas.width/3, this.canvas.height/3);
    }

    mainGameLoop()
    {
            //this.updateTableausFoundationsFreeCells();
            //this.clearCanvas();
            //this.updateDisplay();

            /*
            if (this.cardsInstance != this.cardsInstanceCopys[this.cardsInstanceCopys.length - 1])
            {
                let cardIntanceCopy = this.cardsInstance;
                this.cardsInstanceCopys.push(cardIntanceCopy);
            }
            */

            this.cardsInstance = this.getMainArrayCards();
            this.giveCardsArrayIndexAsAtribute();

            this.generateCardInstanceHitBoxes();
            this.removeHitboxesFromPlaceholderCardsInFreeCells();

            this.updateNumberOfMaxMoves();

            this.selectClickedCard();

            this.pushCardInstanceChanges();
            this.updateTableausFoundationsFreeCells();
            this.cardsInstance = this.getMainArrayCards();

            this.clearCanvas();
            this.updateDisplay();
            this.highlightSelectedCardsHitbox();

            if (this.winCheck == true)
            {
                this.displayWin();
            }
    }
}