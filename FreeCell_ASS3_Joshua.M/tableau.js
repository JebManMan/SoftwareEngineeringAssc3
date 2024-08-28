class Tableau
{
    constructor()
    {
        //Top most card will the largest index card in the array
        this.cards = []
    }

    getTopCard()
    {
        return (this.cards[this.cards.length - 1]);
    }

    addCard(card)
    {
        this.cards.push(card);
    }
}