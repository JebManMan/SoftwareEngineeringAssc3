class Foundation
{
    constructor(suit)
    {
        this.cards = [];
        this.suit = suit;
        this.x = 0;
        this.y = 0;
    }

    topCardInheritPosition()
    {
        if (this.cards.length != 0)
        {
            this.cards[this.cards.length - 1].x = this.x;
            this.cards[this.cards.length - 1].y = this.y;
        }
    }


    isEmpty()
    {
        var isEmpty = false
        if (this.cards.length == 0)
        {
            isEmpty = true
        }
        return isEmpty;
    }

    getSuit()
    {
        return this.suit;
    }

    getTopCard()
    {
        return this.cards[this.cards.length - 1];
    }
}