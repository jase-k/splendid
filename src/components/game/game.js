import React  from "react";
import LeftPlayer from "./LeftPlayer/leftplayer";
import RightPlayer from "./RightPlayer/rightplayer";
import Board from "./Board/board";


class Game extends React.Component {
    render(){
        return(
            <div className="container">
                < LeftPlayer players={this.props.game.players} />
                < Board game={this.props.game}/>
                < RightPlayer players={this.props.game.players}/>
            </div>
        )
    }
}
export default Game;