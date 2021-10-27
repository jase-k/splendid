import {React, Component} from 'react';
import './holdingarea.css'

class HoldingArea extends Component {
    componentDidMount(){
        setInterval(this.props.getUpdate, 5000);
    }
    // componentWillUnmount(){
    //     clearInterval(updateInterval) 
    // }
    renderPlayers(){
        let players = []
        let gamePlayers = this.props.gameData.players
        for(var i = 0; i < gamePlayers.length; i++){
            players.push(
                <div className="playerWaitingContainer" key={i}>
                    <h4>{gamePlayers[i].user.username}</h4>
                    <img src={process.env.PUBLIC_URL +"characters/"+gamePlayers[i].character_id+".png"}/>
                </div>
            )
        }
        return players
    }
    render(){

        return(
            <div className="signinContainer">
                <form>  
                    <h3>Game id: {this.props.gameData.id}</h3>
                    <h2>Players Ready: </h2>
                    <div className="bullpen">
                        {this.renderPlayers()}
                    </div>
                    <input type="button" value="Launch Game" className="launchGame" onClick={this.props.initGame}/>
                    <br />
                    <small>
                        Launching Game will prevent any other players from joining
                    </small>
                </form>
            </div>
        )
    }
}
export default HoldingArea;