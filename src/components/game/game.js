import React  from "react";
import PlayerPanel from "./PlayerPanel/playerpanel"
import Board from "./Board/board";


class Game extends React.Component {
    render(){
        return(
            <div className="container">
                <img src={process.env.PUBLIC_URL +"background.jpg"} className="background"/>
                < PlayerPanel players={this.props.game.players} 
                turn={this.props.game.turn}
                side="left" />
                < Board 
                game={this.props.game}
                currentTurn = {this.props.currentTurn}
                selectToken = {this.props.selectToken}
                selectCard = {this.props.selectCard}
                />
                < PlayerPanel players={this.props.game.players} 
                turn={this.props.game.turn}
                side="right" />
            </div>
        )
    }
}
export default Game;