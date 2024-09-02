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
        if (this.cards != [])
        {
            this.cards[this.cards.length].x = this.x;
            this.cards[this.cards.length].y = this.y;
        }
    }


    isEmpty()
    {
        if (this.cards.length == 0)
        {
            return false;
        }
        return true;
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