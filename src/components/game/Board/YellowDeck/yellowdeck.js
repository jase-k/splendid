import React  from "react";

class YellowDeck extends React.Component {
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
            <img src={process.env.PUBLIC_URL +"cardImgs/"+card.id+".svg"} 
            className ="card"
            />
        )
    }
    render(){
        return(
            <div className="deckContainer">
                <img src={process.env.PUBLIC_URL + "cardImgs/yellowdeck.svg"} />
                {this.renderCards(this.props.deck.cards)}
            </div>
        )
    }
}
export default YellowDeck;