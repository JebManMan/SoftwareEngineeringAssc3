class FreeCell
{
    constructor()
    {
        this.card = null;
        this.cards = [];
        this.y = 0;
        this.x = 0;
    }

    pushToCards(card)
    {
        this.cards.push(card);
    }

    freeToMoveCardIn()
    {
        var freeToMoveCardIn = true;
        if (this.cards.length >= 2)
        {
            freeToMoveCardIn = false;
        }
        return freeToMoveCardIn;
    }

    isEmpty()
    {
        var isEmpty = false;
        if (this.cards.length == 0)
        {
            isEmpty = true;
        }
        return isEmpty;
    }

    cardsInheritPosition()
    {
        for (let card of this.cards)
        {
            card.x = this.x;
            card.y = this.y;
        }
    }
}