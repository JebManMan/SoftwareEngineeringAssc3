class Foundation
{
    constructor(suit)
    {
        this.cards = [];
        this.suit = suit;
        this.x = 0;
        this.y = 0;
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