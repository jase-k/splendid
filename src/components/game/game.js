import React  from "react";
import PlayerPanel from "./PlayerPanel/playerpanel"
import Board from "./Board/board";
import './playTurn.css'


class Game extends React.Component {
    renderCanPlay(){
        if(this.props.currentTurn.canPlay){
            return(
                <div className="playTurn">
                    <div className='playingObjects'>
                        {this.takeObjects()}
                    </div>
                    <button 
                    className="playButton"
                    onClick={this.props.playTurn}
                    value="play"
                    >Play!</button>
                    <button 
                    className="cancelButton"
                    onClick={this.props.cancelPlay}
                    value="cancel"
                    >Cancel.</button>
                </div>
            )
        }
    }
    takeObjects(){
        if(this.props.currentTurn.cardSelected.id){
            return(
                <img src={process.env.PUBLIC_URL +"cardImgs/"+this.props.currentTurn.cardSelected.id+".png"}
                className = {"card"}
                />
            )
        }
        else{
            var tokenDict = {
                6: "gold", 
                5: "emerald", 
                4: "diamond",
                3: "ruby",
                2: "sapphire",
                1: "onyx"
            }
            var tokens = []
            for(var i =0; i < this.props.currentTurn.tokensSelected.length; i++){
                tokens.push(
                    <img 
                    src={process.env.PUBLIC_URL + '/tokenImgs/'+tokenDict[this.props.currentTurn.tokensSelected[i]]+'.svg'} 
                    className={"tokenImg a"+i} 
                    />
                )
            }
            return tokens
        }
    }
    renderCanNoble(){
        console.log(this.props)
        if(this.props.availableNobles.length > 0){
            return(
                <div className="championOverlay">
                    <div className="playTurn buyNoble">
                        <h3>Nobles Available for {this.props.loggedInPlayer.user.username}</h3>
                        <div className="nobleContainer">
                            {this.renderNobles()}
                        </div>
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
    endgame(){
        if(this.props.game.champion.length > 0){
            return(
                <div className="championOverlay">
                    <h1>This game was won by <strong>{this.props.game.champion.user.username}</strong></h1>
                </div>
            )
        }
    }
    holdTurn(){
        console.log("Players", this.props.game.players)
        var player = this.props.game.players.filter(player => player.user.id === this.props.loggedInPlayer.user.id)[0]
        var position = player.turn
        if(this.props.game.turn%this.props.game.players.length === position){
            return
        }
        else{
            return(
                <div className="championOverlay">
                    <h1>Please Get Ready for you're next turn</h1>
                </div>
            )
        }
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
                loggedInPlayer = {this.props.loggedInPlayer}
                />
                < PlayerPanel players={this.props.game.players} 
                turn={this.props.game.turn}
                side="right" />
                {this.renderCanPlay()}
                {this.holdTurn()}
                {this.renderCanNoble()}
                {this.endgame()}
            </div>
        )
    }
}
export default Game;