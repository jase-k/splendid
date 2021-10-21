import React  from "react";
import Deck from "./Deck/deck";
import NobleContainer from "./Nobles/nobles";
import TokenContainer from "./Tokens/tokenContainer";


class Board extends React.Component {
    // componentDidMount(){
    //     updateInterval();
    // }
    // componentWillUnmount(){
    //     clearInterval(updateInterval) 
    // }
    render(){
        var decks = this.props.game.decks
        for(var i = 0; i < decks.length; i++){
            if(decks[i].color == "blue"){
                var bluedeck = decks[i]
            }
            if(decks[i].color == "green"){
                var greendeck = decks[i]
            }
            if(decks[i].color == "yellow"){
                var yellowdeck = decks[i]
            }
        }
        return(
            <div className="boardContainer">
                < NobleContainer nobles={this.props.game.nobles}/>
                < Deck 
                deck={bluedeck} 
                deckCover = "bluedeck.svg"
                selectCard = {this.props.selectCard}
                />
                < Deck 
                deck={yellowdeck}
                deckCover = "yellowdeck.svg"
                selectCard = {this.props.selectCard}
                />
                < Deck 
                deck={greendeck}
                deckCover = "greendeck.svg"
                selectCard = {this.props.selectCard}
                />
                < TokenContainer 
                tokens ={this.props.game.tokenPool} 
                tokensSelected = {this.props.currentTurn.tokensSelected}
                selectToken = {this.props.selectToken}
                />
            </div>
        )
    }
}
export default Board;