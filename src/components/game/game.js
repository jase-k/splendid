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
    renderCanNoble(){
        console.log(this.props)
        if(this.props.availableNobles.length > 0){
            return(
                <div className="playTurn buyNoble">
                    <h3>Nobles Available for {this.props.loggedInPlayer.user.username}</h3>
                    <div className="nobleContainer">
                        {this.renderNobles()}
                    </div>
                </div>
            )
        }
    }
    renderNobles(){
        var nobles = []
        for(var i =0 ; i < this.props.availableNobles.length; i++){
            nobles.push(
            <img 
            src={process.env.PUBLIC_URL + '/nobleImgs/'+this.props.availableNobles[i].id+'.png'} 
            className={"nobleImg "+this.props.availableNobles[i].id}
            alt=''
            onClick={this.props.getNoble}
            />
            )
        }
        return nobles
    }
    render(){
        return(
            <div className="container">
                <img src={process.env.PUBLIC_URL +"background.jpg"} className="background" alt=""/>
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
                {this.renderCanNoble()}
            </div>
        )
    }
}
export default Game;