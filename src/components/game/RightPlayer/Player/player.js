import React from "react";
import Character from "./Character/character";
import Hand from "./Hand/hand";
import './player.css'

class Player extends React.Component{
    render(){
        return(
            <div className={"player "+this.props.side}>
                < Character player={this.props.player} side={this.props.side} />
                < Hand 
                tokens={this.props.player.tokens}
                hand={this.props.player.cards}
                side={this.props.side}
                />
            </div>
        )
    }
}

export default Player