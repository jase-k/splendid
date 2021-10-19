import React  from "react";
import PlayerPanel from "./PlayerPanel/playerpanel"
import Board from "./Board/board";


class Game extends React.Component {
    render(){
        return(
            <div className="container">
                < PlayerPanel players={this.props.game.players} 
                turn={this.props.game.turn}
                side="left" />
                < Board game={this.props.game}/>
                < PlayerPanel players={this.props.game.players} 
                turn={this.props.game.turn}
                side="right" />
            </div>
        )
    }
}
export default Game;