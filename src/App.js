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
        user_id: null,
        currentTurn: { //default everytime component rerenders
          canPlay: false,
          player: gameData.players[gameData.turn % gameData.players.length],
          choice: null, // null, tokens, card
          tokensSelected : [], //Array of 3 token Ids
          cardSelected : null //1 card Id
      }
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.getGameUpdate = this.getGameUpdate.bind(this)
    this.handleInitializeGame = this.handleInitializeGame.bind(this)
    this.handleSelectCard = this.handleSelectCard.bind(this)
    this.handleGetToken = this.handleGetToken.bind(this)
    this.playTurn = this.playTurn.bind(this)
  }
  handleGetToken(e){
    var tokenName = e.target.parentElement.classList[1]
    var currentTokens = 0;
    for(const key in this.state.currentTurn.player.tokenPool){
      console.log("key:", key)
      console.log('combined',this.state.currentTurn.player.tokenPool[key])
      currentTokens += parseInt(this.state.currentTurn.player.tokenPool[key])
      console.log(currentTokens)
    }
    console.log("number of tokens ", currentTokens)
    var tokenDict = {
      "onyx" : 1, 
      "sapphire" : 2, 
      "ruby" : 3, 
      "diamond" : 4, 
      "emerald" : 5, 
      "gold" : 6
    }
    var updated = this.state.currentTurn
    updated.cardSelected = null
    if(tokenName == "gold" && currentTokens != 10){
      updated.tokensSelected = [] //clears selected tokens if choice is gold
      updated.tokensSelected.push(tokenDict[tokenName])
      updated.canPlay = true
      this.setState({
        currentTurn: updated
      })
      return
    }

    if(updated.tokensSelected.length == 0 && currentTokens != 10){
      updated.tokensSelected.push(tokenDict[tokenName]) //Adds the new choice
      updated.canPlay = false
      this.setState({
        currentTurn: updated
      })
      return
    }else if(updated.tokensSelected[0] == 6 && currentTokens != 10){
      updated.tokensSelected = [] //clears gold if choice is not gold
      updated.tokensSelected.push(tokenDict[tokenName]) //Adds the new choice      
      updated.canPlay = false
      this.setState({
        currentTurn: updated
      })
      return
    }

    if(updated.tokensSelected.length == 1){
      if(tokenDict[tokenName] == updated.tokensSelected[0]){ //check if selected token matches
        if(this.state.gameData.tokenPool[tokenName] > 3 && currentTokens < 9){ //Are their 4 or more tokens in the game.tokenPool
          updated.tokensSelected.push(tokenDict[tokenName]) //Adds the new choice
          updated.canPlay = true
          this.setState({
            currentTurn: updated
          })
          return
        }
        else{
          updated.tokensSelected = [] 
          updated.canPlay = false
          this.setState({
            currentTurn: updated
          })
          return
        }
      }
      else{
        if(currentTokens < 9){
          updated.tokensSelected.push(tokenDict[tokenName]) //Adds the new choice
          updated.canPlay = false
            this.setState({
              currentTurn: updated
            })
            return
        }
      }
    }
    if(updated.tokensSelected.length == 2){
      if(updated.tokensSelected[1] === updated.tokensSelected[0]){
        if(tokenDict[tokenName] == updated.tokensSelected[0]){
          updated.tokensSelected =[]
          updated.canPlay = false
          this.setState({
            currentTurn: updated
          })
          return
        }
        return
      }
      if(tokenDict[tokenName] == updated.tokensSelected[0]){
        updated.tokensSelected.shift()
        updated.canPlay = false
        this.setState({
          currentTurn: updated
        })
        return
      }
      if(tokenDict[tokenName] == updated.tokensSelected[1]){
        updated.tokensSelected.pop()
        updated.canPlay = false
        this.setState({
          currentTurn: updated
        })
        return
      }
      if(currentTokens < 8){
        updated.tokensSelected.push(tokenDict[tokenName])
        updated.canPlay = true
        this.setState({
          currentTurn: updated
        })
        return
      }
    }
    if(updated.tokensSelected.length == 3){
      for(var i = 0 ; i < 3; i++){
        if(updated.tokensSelected[i] == tokenDict[tokenName]){
          updated.tokensSelected.splice(i, 1)
          updated.canPlay = false
          this.setState({
            currentTurn: updated
          })
          return
        }
      }
    }
  } 

  handleSelectCard(e){
    console.log("selected card", e.target.classList[1])
    var updated = this.state.currentTurn
    updated.tokensSelected = []
    updated.canPlay = true
    updated.cardSelected = e.target.classList[1]
    this.setState({
      currentTurn: updated
    })
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
          
          var updated = this.state.currentTurn
          updated.player = (response.players[response.turn % response.players.length])
          this.setState({
            gameStatus: "active",
            gameData: response,
            currentTurn: updated
          })
        }
        else{
          this.setState({
            gameData: response
          })
        }
      }
    }
    var data ={
      "game_id" : this.state.gameData.id
    }
    xhr.send(JSON.stringify(data))
  }
  playTurn(e){
    if(e.target.value == 'cancel'){
      var updated = this.state.currentTurn
      updated.canPlay = false
      this.setState({
        currentTurn: updated
      })
    }
    if(e.target.value == 'play'){
      if(this.state.currentTurn.tokensSelected.length > 0){
        var xhr = new XMLHttpRequest();
        var url = '/games/'+this.state.gameData.id+"/taketokens/"+this.state.currentTurn.player.id
        xhr.open("POST", API_URL+ url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => { // Call a function when the state changes.
          if (xhr.readyState === XMLHttpRequest.DONE) {
              let response = JSON.parse(xhr.response)
                if(xhr.status === 200){
                  this.setState({
                    currentTurn: { //default everytime component rerenders
                      canPlay: false,
                      player: response.players[response.turn % response.players.length],
                      choice: null, // null, tokens, card
                      tokensSelected : [], //Array of 3 token Ids
                      cardSelected : null //1 card Id
                  }
                  })
                  this.getGameUpdate()
                }
                else{
                  console.log(response)
                  alert("Problem with Play! ")
                }
            }
        }
        var data = {
            "tokens" : this.state.currentTurn.tokensSelected
        }
        xhr.send(JSON.stringify(data));
      }
      if(this.state.currentTurn.cardSelected){
        var xhr = new XMLHttpRequest();
        var url = '/games/'+this.state.gameData.id+"/takecard/"+this.state.currentTurn.player.id
        xhr.open("POST", API_URL+ url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => { // Call a function when the state changes.
          if (xhr.readyState === XMLHttpRequest.DONE) {
              let response = JSON.parse(xhr.response)
                if(xhr.status === 200){
                  this.setState({
                    currentTurn: { //default everytime component rerenders
                      canPlay: false,
                      player: response.players[response.turn % response.players.length],
                      choice: null, // null, tokens, card
                      tokensSelected : [], //Array of 3 token Ids
                      cardSelected : null //1 card Id
                  }
                  })
                  this.getGameUpdate()
                }
                else{
                  console.log(response)
                  alert("Problem with Play! ")
                }
            }
        }
        var data = {
            "card_id" : parseInt(this.state.currentTurn.cardSelected)
        }
        xhr.send(JSON.stringify(data));
      }
    }
  }
  renderApp(){
    if(this.state.gameStatus === "active"){
        return(<Game 
          game={this.state.gameData} 
          currentTurn = {this.state.currentTurn}
          selectToken = {this.handleGetToken}
          selectCard = {this.handleSelectCard}
          playTurn = {this.playTurn}
          />)
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
        />)
    }
  }
  render(){
    
    console.log("Current Turn STATE: ", this.state.currentTurn)
    return (
      <div className="App">
          {this.renderApp()}
      </div>
    );
  }
}

export default App;
