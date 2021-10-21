import logo from './logo.svg';
import WaitingArea from './components/waiting/waitingarea'
import Game from './components/game/game'
import './App.css';
import gameData from './SampleGame'
import React from 'react';

var API_URL = 'http://localhost:8080'

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
    this.handleLogin = this.handleLogin.bind(this)
    this.getGameUpdate = this.getGameUpdate.bind(this)
    this.handleInitializeGame = this.handleInitializeGame.bind(this)
  }
  handleRegister(){
    console.log("click")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL+'/users/new', true);

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
        "confirm" : document.querySelector('#confirm').value,
        "email" : document.querySelector('#email').value
    }
    xhr.send(JSON.stringify(data));
  }
  handleLogin(){ 
    console.log("click")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL+ '/login', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => { // Call a function when the state changes.
      if (xhr.readyState === XMLHttpRequest.DONE) {
          let response = JSON.parse(xhr.response)
            if(xhr.status === 200){
              console.log(this)
              this.setState({
                  loggedIn: true,
                  username: response.username,
                  user_id: response.id
              })
            }
            else{
              console.log(response)
              alert("Unrecognized User. Please try again. If problem persists email jase@perfectmypodcast.com")
            }
        }
    }
    var data = {
        "username" : document.querySelector('#username').value,
        "password" : document.querySelector('#password').value
    }
    xhr.send(JSON.stringify(data));
  }

  handleInitializeGame(){ 
    var xhr = new XMLHttpRequest();
    var url = API_URL+"/games/start"
    
    xhr.open("POST", url, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
        //Go to Staging Area
        var response = JSON.parse(xhr.response)
        console.log("Game Started: ", response)
        this.setState({
          gameStatus: "active",
          gameData: response
        })
      }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = {
      "game_id" : this.state.gameData.id
    }
    xhr.send(JSON.stringify(data))
  }
  handleStartGame(e){
    var xhr = new XMLHttpRequest();
    var url = API_URL+"/games/new?user_id="+this.state.user_id
    var char_id = document.getElementById("character_id").value
    var joinOrStart = document.getElementById("join_start").value

    if(joinOrStart === "new_game"){
      url += "&character_id="+char_id
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
    else{ 
      var url = API_URL+"/games/join"
      var game_id = document.getElementById("game_id").value

      xhr.open("POST", url, true);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
          //Go to Staging Area
          var response = JSON.parse(xhr.response)
          console.log("Game Joined: ", response)
          this.setState({
            gameStatus: "waiting",
            gameData: response
          })
        }
      }
      xhr.setRequestHeader("Content-Type", "application/json");
      var data ={
        "user_id" : this.state.user_id,
        "character_id" : parseInt(char_id),
        "game_id" : parseInt(game_id)
      }
      xhr.send(JSON.stringify(data))
    }
    

  }
  getGameUpdate(){ 
    var xhr = new XMLHttpRequest();
    var url = API_URL+"/games/"+ this.state.gameData.id
    
    xhr.open("POST", url, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
        //Go to Staging Area
        var response = JSON.parse(xhr.response)
        console.log("Game Update: ", response)
        if(response.turn > 0){
          this.setState({
            gameStatus: "active"
          })
        }
        this.setState({
          gameData: response
        })
      }
    }
    var data ={
      "game_id" : this.state.gameData.id
    }
    xhr.send(JSON.stringify(data))
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
        gameData = {this.state.gameData} 
        login = {this.handleLogin}
        initGame = {this.handleInitializeGame}
        getUpdate = {this.getGameUpdate}
        // joinGame = {this.handleJoinGame}
        />)
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
