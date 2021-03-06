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
        var clickFunction = this.props.selectCard
        var hover = " hover"
        var tokenPool = this.props.player.tokenPool
        // console.log("CARD", card, tokenPool)
        var tokenList = ["diamond", "ruby", "sapphire", "onyx", "emerald"]
        var goldCount = tokenPool.gold

        
        for(var i = 0; i < 5; i++){
            // console.log(`I'm trying to subract ${card.tokenCost[tokenList[i]]} from ${tokenPool[tokenList[i]]}`)
            var numOfCards = 0;
            for(var j = 0; j < this.props.player.cards.length; j++){
                if(this.props.player.cards[j].tokenName === tokenList[i]){
                    numOfCards++
                }
            }
            var num = card.tokenCost[tokenList[i]] - tokenPool[tokenList[i]] - numOfCards
            if(num > 0){
                goldCount -= num
            }
        }
        if(goldCount < 0 && this.props.currentTurn.reserveCard === false){
            clickFunction = () =>{}
            hover = ""
        }
        
        
        return (
            <img src={process.env.PUBLIC_URL +"cardImgs/"+card.id+".png"}
            className = {"card "+card.id+" "+card.tokenName+hover}
            onClick={clickFunction}
            alt ={card.tokenName}
            key={card.id}
            />
        )
    }
    render(){
        return(
            <div className="deckContainer" key={this.props.deckCover}>
                <img src={process.env.PUBLIC_URL + "cardImgs/"+this.props.deckCover} alt="deck" key={this.props.deckCover} />
                {this.props.renderCards(this.props.deck.cards)}
            </div>
        )
    }
}
export default Deck;