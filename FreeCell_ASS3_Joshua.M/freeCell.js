class FreeCell
{
    constructor()
    {
        this.card = null;
        this.y = 0;
        this.x = 0;
    }

    isEmpty()
    {
        if (this.card == null)
        {
            return (true);
        }
        return (false);
    }

    cardInheritPosition()
    {
        if (this.card != null)
        {
            this.card.x = this.x;
            this.card.y = this.y;
        }
    }
}