import React  from "react";
import GreenDeck from "./GreenDeck/greendeck";
import YellowDeck from "./YellowDeck/yellowdeck";
import BlueDeck from "./BlueDeck/bluedeck";
import NobleContainer from "./Nobles/nobles";
import TokenContainer from "./Tokens/tokenContainer";


class Board extends React.Component {
    render(){
        var decks = this.props.game.decks
        for(var i = 0; i < decks.length; i++){
            if(decks[i].color == "blue"){
                var bluedeck = decks[i]
                console.log(bluedeck)
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
                < BlueDeck deck={bluedeck} />
                < YellowDeck deck={yellowdeck}/>
                < GreenDeck deck={greendeck}/>
                < TokenContainer tokens ={this.props.game.tokenPool} />
            </div>
        )
    }
}
export default Board;