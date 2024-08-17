class Tableau
{
    constructor()
    {
        this.cards = []
    }

    getTopCard()
    {
        return this.cards[this.cards.length - 1]
    }
}