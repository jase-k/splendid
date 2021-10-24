import React from 'react';
import './character.css'

class Character extends React.Component{
    renderReservedCards(){
        var numOfCards = 0; 
        for(var i = 0; i < this.props.player.ownedCards.length; i++){
            if(this.props.player.ownedCards[i] === "0"){
                numOfCards++
            }
        }
        return(
            <div className = {"reservedCards "+this.props.side}>{numOfCards}</div>
        )
    }
    render(){
        var active = ""
        var position = this.props.player.turn
        var turn = this.props.turn
        if(turn%this.props.numOfPlayers === position){
            active = "active"
        }
        return(
            <div className= {"characterContainer "+this.props.side}>
                {this.renderReservedCards()}
                <div className = {"character "+this.props.side}>
                    <p className={"score "+this.props.side}><span>{this.props.score}</span></p>
                    <img src={process.env.PUBLIC_URL+"/characters/"+this.props.player.character_id+".png"} 
                    className={"character "+active+" "+this.props.side}
                    alt=""
                    />
                </div>
            </div>
        )
    }
}
export default Character