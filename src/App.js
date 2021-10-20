import logo from './logo.svg';
import WaitingArea from './components/waiting/waitingarea'
import Game from './components/game/game'
import './App.css';
import gameData from './SampleGame'
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        loggedIn: false,
        gameStatus: null, // null === (game not initialized); "waiting" === (game initialized but waiting for players); "active" === (no more players can join play is active)
        gameData: gameData,
        username: null,
        character: null,
        user_id: null
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
  }
  handleRegister(){
    console.log("click")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8080/users/new', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(this)
            let response = JSON.parse(xhr.response)
            this.setState({
                loggedIn: true,
                username: response.username,
                user_id: response.id
            })
        }
    }
    var data = {
        "username" : document.querySelector('#username').value,
        "password" : document.querySelector('#password').value,
        "confirm" : document.querySelector('#confirm').value
    }
    xhr.send(JSON.stringify(data));
  }
  handleStartGame(e){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/games/new?user_id="+this.state.user_id
    xhr.open("GET", url , true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(JSON.parse(xhr.response))
            let response = JSON.parse(xhr.response)
            this.setState({
              gameStatus: "waiting",
              gameData: response
            })
            
        }
    }

    xhr.send();
    

  }
  renderApp(){
    if(this.state.gameStatus === "active"){
        return(<Game game={this.state.gameData} />)
      }
    else{
      return(< WaitingArea 
        register={this.handleRegister}
        loggedIn={this.state.loggedIn}
        startgame ={this.handleStartGame}
        gameStatus ={this.state.gameStatus}
        gameData = {this.state.gameData} />)
    }
  }
  render(){
    
    console.log("GAME STATE: ", this.state)
    return (
      <div className="App">
          {this.renderApp()}
      </div>
    );
  }
}

export default App;
