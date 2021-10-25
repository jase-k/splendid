import React from "react";
import './hand.css'

class Hand extends React.Component{
    renderCards(cardArray){
        var cards = []
        var hand = this.calculateCards(cardArray)
        for(const key in hand){
            cards.push(
                <div className={"cardHand "+key+" "+this.props.side} >
                    <span>{hand[key]}</span>
                </div>
            )
        }
        return(cards)
    }
    calculateCards(cardArray){
        var cards = {
            "gold" : 0,
            "diamond" : 0, 
            "onyx" : 0,
            "emerald" : 0, 
            "ruby" : 0, 
            "sapphire" : 0, 
        }
        for(var i = 0; i < cardArray.length; i++){
            if(this.props.player.ownedCards[i] === "1"){
                cards[cardArray[i].tokenName]++
            }
        }
        return cards
    }
    renderTokens(tokenObject){
        var tokens = []
        for(const key in tokenObject){
            tokens.push(
                <div className={"tokenHand "+key+" "+this.props.side} >
                    <span>{tokenObject[key]}</span>
                </div>
            )
        }
        return(tokens)
    }
    render(){
        return(
            <div className={"allHand "+this.props.side}>
                <div className={"hand "+this.props.side}>
                    {this.renderCards(this.props.hand)}
                </div>
                <div className={"tokens "+this.props.side}>
                    {this.renderTokens(this.props.tokens)}
                </div>
            </div>
                
        )
    }
}
export default Hand;