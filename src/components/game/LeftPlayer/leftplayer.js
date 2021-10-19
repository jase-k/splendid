import React  from "react";
import Player from "../RightPlayer/Player/player";

class LeftPlayer extends React.Component {
    render(){
        return(
            <div className="playerContainer left">
                < Player player={this.props.players[3]} side="left"/>
                < Player player={this.props.players[2]} side="left"/>
            </div>
        )
    }
}
export default LeftPlayer;