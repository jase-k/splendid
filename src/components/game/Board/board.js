import React  from "react";
import GreenDeck from "./GreenDeck/greendeck";
import YellowDeck from "./YellowDeck/yellowdeck";
import BlueDeck from "./BlueDeck/bluedeck";
import NobleContainer from "./Nobles/nobles";
import TokenContainer from "./Tokens/tokenContainer";


class Board extends React.Component {
    render(){
        return(
            <div className="boardContainer">
                < NobleContainer />
                <BlueDeck />
                < YellowDeck />
                < GreenDeck />
                < TokenContainer />
            </div>
        )
    }
}
export default Board;