import React from "react";
import Character from "./Character/character";
import Hand from "./Hand/hand";
import './player.css'

class Player extends React.Component{
    findScore(player){
        var totalScore = 0
        for(var i = 0; i < player.nobles.length; i++){
            totalScore += player.nobles[i].score
        }
        for(i = 0; i < player.cards.length; i++){
            totalScore += player.cards[i].score
        }

        return totalScore;
    }
    render(){
        return(
            <div className={"player "+this.props.side}>
                < Character 
                player={this.props.player} 
                side={this.props.side}
                turn={this.props.turn}
                score={this.findScore(this.props.player)}
                numOfPlayers={this.props.numOfPlayers}
                />
                < Hand 
                tokens={this.props.player.tokenPool}
                hand={this.props.player.cards}
                side={this.props.side}
                numOfPlayers={this.props.numOfPlayers} 
                />
            </div>
        )
    }
}

export default Player