import React  from "react";
import Player from './Player/player'
import './Player/player.css'

class RightPlayer extends React.Component {
    render(){
        return(
            <div className="playerContainer right">
                < Player player={this.props.players[0]} side="right"/>
                < Player player={this.props.players[1]} side="right"/>
            </div>
        )
    }
}
export default RightPlayer;