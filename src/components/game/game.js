import React  from "react";
import PlayerPanel from "./PlayerPanel/playerpanel"
import Board from "./Board/board";
import './playTurn.css'


class Game extends React.Component {
    renderCanPlay(){
        if(this.props.currentTurn.canPlay){
            return(
                <div className="playTurn">
                    <button 
                    className="playButton"
                    onClick={this.props.playTurn}
                    value="play"
                    >Play!</button>
                    <button 
                    className="cancelButton"
                    onClick={this.props.playTurn}
                    value="cancel"
                    >Cancel.</button>
                </div>
            )
        }
    }
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
                {this.renderCanPlay()}
            </div>
        )
    }
}
export default Game;