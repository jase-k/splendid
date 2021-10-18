import React  from "react";
import LeftPlayer from "./LeftPlayer/leftplayer";
import RightPlayer from "./RightPlayer/rightplayer";
import Board from "./Board/board";

class Game extends React.Component {
    render(){
        return(
            <div className="container">
                < LeftPlayer />
                < Board />
                < RightPlayer />
            </div>
        )
    }
}
export default Game;