import React  from "react";

class GreenDeck extends React.Component {
    renderCards(deckArray){
        var cards = []
        for(var i = 0; i < 4 && i < deckArray.length; i++){
            cards.push(this.renderCard(deckArray[i]))
        }
        return cards
    }
    renderCard(card){
        console.log("CARD", card)
        return (
            <img src={process.env.PUBLIC_URL +"cardImgs/"+card.id+".png"} 
            className="card"
            />
        )
    }
    render(){
        return(
            <div className="deckContainer">
                <img src={process.env.PUBLIC_URL + "cardImgs/greendeck.svg"} />
                {this.renderCards(this.props.deck.cards)}
            </div>
        )
    }
}
export default GreenDeck;