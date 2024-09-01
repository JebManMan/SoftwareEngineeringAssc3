class Tableau
{
    constructor()
    {
        //Top most card will the largest index card in the array
        this.cards = []
        this.y = 0;
        this.x = 0;
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