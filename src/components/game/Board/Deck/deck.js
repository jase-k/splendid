import React  from "react";
import './deck.css'

class Deck extends React.Component {
    renderCards(deckArray){
        var cards = []
        for(var i = 0; i < 4 && i < deckArray.length; i++){
            cards.push(this.renderCard(deckArray[i]))
        }
        return cards
    }
    renderCard(card){
        return (
            // <img src={process.env.PUBLIC_URL +"cardImgs/"+card.id+".svg"}
            // className = "card"
            // />
            <img src={process.env.PUBLIC_URL +"cardImgs/"+card.id+".png"}
            className = "card"
            onClick={this.props.selectCard}
            />
        )
    }
    render(){
        return(
            <div className="deckContainer">
                <img src={process.env.PUBLIC_URL + "cardImgs/"+this.props.deckCover} />
                {this.renderCards(this.props.deck.cards)}
            </div>
        )
    }
}
export default Deck;