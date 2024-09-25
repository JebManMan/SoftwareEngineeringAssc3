class Tableau
{
    constructor()
    {
        //Top most card will the largest index card in the array
        this.cards = []
        this.y = 0;
        this.x = 0;
    }

    isEmpty()
    {
        if (this.cards.length == 0)
        {
            return false;
        }
        return true;
    }

    getTopCard()
    {
        return (this.cards[this.cards.length - 1]);
    }

    addCard(card)
    {
        this.cards.push(card);
    }

    isEmptyExcludingPlaceholders()
    {   
        var empty = true;
        var cardsWithoutPlaceholder = [];
        for (let card of this.cards)
        {
            if (card.isPlaceholder == false)
            {
                cardsWithoutPlaceholder.push(card);
            }
        }
        if (cardsWithoutPlaceholder.length > 0)
        {
            empty = false;
        }
        return empty;
    }
}