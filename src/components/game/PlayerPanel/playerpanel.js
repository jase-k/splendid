import React  from "react";
import Player from './Player/player'
import './Player/player.css'

class PlayerPanel extends React.Component {
    renderPlayers(playersArray){
        var players = []
        var i = 0
        if(this.props.side === "right"){
            i = 1;
        }
        for(i; i < playersArray.length; i +=2){
            players.push(< Player player={playersArray[i]} 
                side={this.props.side} 
                turn={this.props.turn}
                numOfPlayers={playersArray.length}
                openReservedCardPanel = {this.props.openReservedCardPanel}
                closeReservedCardPanel = {this.props.closeReservedCardPanel}
                loggedInPlayer = {this.props.loggedInPlayer}
                reserveCanPlay = {this.props.reserveCanPlay}
                />)
            }
        return players
    }
    render(){
        return(
            <div className="playerContainer right">
                {this.renderPlayers(this.props.players)}
            </div>
        )
    }
}
export default PlayerPanel;