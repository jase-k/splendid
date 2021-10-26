import logo from './logo.svg';
import WaitingArea from './components/waiting/waitingarea'
import Game from './components/game/game'
import './App.css';
import gameData from './SampleGame'
import React from 'react';


var API_URL = 'http://18.118.84.148'

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
        lastGotNoble: null,
        availableNobles: [],
        currentPlayer: [],
        currentTurn: { //default everytime component rerenders
          canPlay: false,
          reserveCard: false,
          openReserve: false,
          player: gameData.players[gameData.turn % gameData.players.length],
          choice: null, // null, tokens, card
          tokensSelected : [], //Array of 3 token Ids
          cardSelected : {
            id: null, 
            tokenName: null, 
          }
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
    this.handleGetNoble = this.handleGetNoble.bind(this)
    this.cancelPlay = this.cancelPlay.bind(this)
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.setNobleState = this.setNobleState.bind(this)
    this.getReserveCard = this.getReserveCard.bind(this)
    this.getGoldCoin = this.getGoldCoin.bind(this)
    this.openReservedCardPanel = this.openReservedCardPanel.bind(this)
    this.closeReservedCardPanel = this.closeReservedCardPanel.bind(this)
  }
  handleGetToken(e){
    var tokenName = e.target.parentElement.classList[1]
    this.toggleSelectClass(e)
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
    updated.cardSelected = {id: null, tokenName: null}
    if(tokenName === "gold" && currentTokens != 10){
      updated.tokensSelected = [] //clears selected tokens if choice is gold
      updated.tokensSelected.push(tokenDict[tokenName])
      updated.canPlay = true
      this.setState({
        currentTurn: updated
      })
      return
    }

    if(updated.tokensSelected.length === 0 && currentTokens != 10){
      updated.tokensSelected.push(tokenDict[tokenName]) //Adds the new choice
      updated.canPlay = false
      this.setState({
        currentTurn: updated
      })
      return
    }else if(updated.tokensSelected[0] === 6 && currentTokens != 10){
      updated.tokensSelected = [] //clears gold if choice is not gold
      updated.tokensSelected.push(tokenDict[tokenName]) //Adds the new choice      
      updated.canPlay = false
      this.setState({
        currentTurn: updated
      })
      return
    }

    if(updated.tokensSelected.length === 1){
      if(tokenDict[tokenName] === updated.tokensSelected[0]){ //check if selected token matches
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
    if(updated.tokensSelected.length === 2){
      if(updated.tokensSelected[1] === updated.tokensSelected[0]){
        if(tokenDict[tokenName] === updated.tokensSelected[0]){
          updated.tokensSelected =[]
          updated.canPlay = false
          this.setState({
            currentTurn: updated
          })
          return
        }
        return
      }
      if(tokenDict[tokenName] === updated.tokensSelected[0]){
        updated.tokensSelected.shift()
        updated.canPlay = false
        this.setState({
          currentTurn: updated
        })
        return
      }
      if(tokenDict[tokenName] === updated.tokensSelected[1]){
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
    if(updated.tokensSelected.length === 3){
      for(var i = 0 ; i < 3; i++){
        if(updated.tokensSelected[i] === tokenDict[tokenName]){
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
    this.toggleSelectClass(e)
    console.log("selected card", e.target.classList[1])
    var updated = this.state.currentTurn
    if(!this.state.currentTurn.reserveCard){
      updated.tokensSelected = []
    }

    updated.canPlay = true
    if(updated.cardSelected.id === e.target.classList[1]){
      updated.canPlay = false
      updated.cardSelected = {
        id: null,
        tokenName: null,
      }
    }
    else{
      updated.cardSelected = {
        id: e.target.classList[1], 
        tokenName: e.target.classList[2],
        }
    }
    
    this.setState({
      currentTurn: updated
    })
  }
  toggleSelectClass(e){
    e.target.classList.toggle("selectedc")
  }
  handleRegister(){
    console.log("click")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL+'/users/new', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Access-Control-Allow-Origin', "*");

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
          gameData: response,
          currentTurn: { //default everytime component rerenders
            canPlay: false,
            reserveCard: false,
            openReserve: false,
            player: response.players[response.turn % response.players.length],
            choice: null, // null, tokens, card
            tokensSelected : [], //Array of 3 token Ids
            cardSelected : {
              id: null,
              tokenName: null
            },
          }
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
  checkNobles(response, extraCard = ""){
    console.log("EXTRA CARD IS: ", extraCard)
    var currentPlayer = response.players.filter(player => player.user.id === this.state.user_id)
    console.log("CURRENT PLAYER: ", currentPlayer)
    var nobles = response.nobles
    var tokenList = ["diamond", "ruby", "sapphire", "onyx", "emerald"]
    var hand = {
      "diamond" : 0,
      "ruby" : 0, 
      "sapphire" : 0, 
      "onyx" : 0, 
      "emerald" : 0
    }
    if(extraCard != ""){
      if(this.state.currentTurn.cardSelected.id && this.state.currentTurn.tokensSelected.length >0){//Checks to see if the extra card is a reserved card or not.
        // continue
      }
      else{
        hand[extraCard] += 1
      }
    }
    for(var i = 0; i < currentPlayer[0].cards.length; i++){ //sets hand
      if(currentPlayer[0].ownedCards[i] === "1"){ //Checks for Reserved Cards
        hand[currentPlayer[0].cards[i].tokenName] += 1
      }
    }
    var availableNobles = []
    for(var i = 0; i < nobles.length; i++){
      var is_available = true
      for(var j = 0; j < tokenList.length; j++){
        console.log("Hand: ", hand)
        console.log("tokenCost: ", nobles[i].tokenCost)
        if(nobles[i].tokenCost[tokenList[j]] > hand[tokenList[j]]){
          is_available = false
        }
      }
      console.log(is_available)
      if(is_available){
        availableNobles.push(nobles[i])
        }
      }
      return availableNobles
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
        if(response.decks.length > 0){
          
          var updated = this.state.currentTurn
          updated.player = (response.players[response.turn % response.players.length])

          this.setState({
            gameStatus: "active",
            gameData: response,
            currentTurn: updated,
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
  handlePlayClick(e){ //Currently doesn't work properly. 
    //Checks to see if the play would warrant getting a noble 
    var availableNobles = this.checkNobles(this.state.gameData, this.state.currentTurn.cardSelected.tokenName )

    if(this.state.currentTurn.tokensSelected[0] === 6 && this.state.currentTurn.reserveCard === false){
      console.log("CONSOLING LOG RESERVING CARD")
      this.reserveCard()
    }
    else if(availableNobles.length > 0){ // if noble is available, re-renderes the screen with available nobles
      this.setNobleState(availableNobles)
    }
    else{
      this.playTurn()
    }
    //Noble would submit the play information
  }
  //Sends the Noble Div with the information from the play.
  setNobleState(availableNobles){
    var copyCurrentTurn = this.state.currentTurn
    copyCurrentTurn.canPlay = false

    this.setState({
      availableNobles: availableNobles,
      currentTurn: copyCurrentTurn
    })
  }
  cancelPlay(){
    var updated = this.state.currentTurn
    
    updated.canPlay = false
      this.setState({
        currentTurn: updated
      })
  }
  getGoldCoin(){
    var xhr = new XMLHttpRequest();
    var url = '/games/'+this.state.gameData.id+"/taketokens/"+this.state.currentTurn.player.id
    xhr.open("POST", API_URL+ url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => { // Call a function when the state changes.
      if (xhr.readyState === XMLHttpRequest.DONE) {
          let response = JSON.parse(xhr.response)
          console.log("GOT GOLD COIN")
            if(xhr.status === 200){
              this.setState({
                currentTurn: { //default everytime component rerenders
                  canPlay: false,
                  reserveCard: false,
                  openReserve: false,
                  player: response.players[response.turn % response.players.length],
                  choice: null, // null, tokens, card
                  tokensSelected : [], //Array of 3 token Ids
                  cardSelected : {
                    id: null, 
                    tokenName: null,
                  } 
              },
              availableNobles : []
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
  playTurn(){
    if(this.state.currentTurn.tokensSelected[0] === 6 && this.state.currentTurn.reserveCard){
      this.getReserveCard()
      //this.getGoldCoin()
      return
    }
    
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
                    reserveCard: false,
                    openReserve: false,
                    player: response.players[response.turn % response.players.length],
                    choice: null, // null, tokens, card
                    tokensSelected : [], //Array of 3 token Ids
                    cardSelected : {
                      id: null, 
                      tokenName: null,
                    } 
                },
                availableNobles : []
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
    else if(this.state.currentTurn.cardSelected.id){
      console.log("Taking Card")
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
                    reserveCard: false,
                    openReserve: false,
                    player: response.players[response.turn % response.players.length],
                    choice: null, // null, tokens, card
                    tokensSelected : [], //Array of 3 token Ids
                    cardSelected : {
                      id: null, 
                      tokenName: null,
                    } 
                  },
                  availableNobles : []
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
          "card_id" : parseInt(this.state.currentTurn.cardSelected.id)
      }
      xhr.send(JSON.stringify(data));
    }
    
  }
  handleGetNoble(e){ 
    console.log(e.target.classList[1])
    var xhr = new XMLHttpRequest();
        var url = '/games/'+this.state.gameData.id+"/takenoble/"+this.state.currentTurn.player.id
        xhr.open("POST", API_URL+ url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => { // Call a function when the state changes.
          if (xhr.readyState === XMLHttpRequest.DONE) {
              let response = JSON.parse(xhr.response)
                if(xhr.status === 200){
                  console.log("success", response)
                  this.setState({
                    availableNobles : []
                  })
                  this.playTurn()
                }
                else{
                  console.log(response)
                  alert("Problem with Nobles! ")
                }
            }
        }
        var data = {
            "noble_id" : parseInt(e.target.classList[1]),
            "tokenName" : this.state.currentTurn.cardSelected.tokenName
        }
        xhr.send(JSON.stringify(data));
  }
  reserveCard(){
    //pick a card
    var copyCurrentTurn = this.state.currentTurn
    copyCurrentTurn.reserveCard = true
    copyCurrentTurn.canPlay = false
    //render the game board again. Tokens unclickable and all Cards Selectable. 
    this.setState({
      currentTurn: copyCurrentTurn
    })
    //when card is clicked pop-up with button 'reserve card' Go to handle play click. 
    //send API call to db and finish playing the turn with the token. 
  }
  getReserveCard(){
    var xhr = new XMLHttpRequest();
      var url = '/games/'+this.state.gameData.id+"/reservecard/"+this.state.currentTurn.player.id
      xhr.open("POST", API_URL+ url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.response)
              if(xhr.status === 200){
                this.setState({
                  currentTurn: { //default everytime component rerenders
                    canPlay: false,
                    reserveCard: false,
                    openReserve: false,
                    player: response.players[response.turn % response.players.length],
                    choice: null, // null, tokens, card
                    tokensSelected : [], //Array of 3 token Ids
                    cardSelected : {
                      id: null, 
                      tokenName: null,
                    } 
                },
                availableNobles : []
                })
                this.getGameUpdate()
                console.log("RESPONSE AFTER RESERVE CARD", response )
                return
              }
              else{
                console.log(response)
                alert("Problem with Reserving Card!! ")
              }
          }
      }
      var data = {
          "card_id" : parseInt(this.state.currentTurn.cardSelected.id)
      }
      xhr.send(JSON.stringify(data));
  }
  openReservedCardPanel(){
    console.log("click")
    var updated = this.state.currentTurn
    
    updated.openReserve = true
      this.setState({
        currentTurn: updated
      })
  }
  closeReservedCardPanel(){
    console.log("click")
    var updated = this.state.currentTurn
    
    updated.openReserve = false
      this.setState({
        currentTurn: updated
      })
  }
  renderApp(){
    if(this.state.gameStatus === "active"){
        return(<Game 
          game={this.state.gameData} 
          currentTurn = {this.state.currentTurn}
          availableNobles = {this.state.availableNobles}
          selectToken = {this.handleGetToken}
          selectCard = {this.handleSelectCard}
          playTurn = {this.handlePlayClick}
          cancelPlay = {this.cancelPlay}
          loggedInPlayer = {this.state.gameData.players.filter(player => player.user.id === this.state.user_id)[0]}
          getNoble = {this.handleGetNoble}
          openReservedCardPanel = {this.openReservedCardPanel}
          closeReservedCardPanel = {this.closeReservedCardPanel}
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
    
    console.log("Current Turn STATE: ", this.state)
    return (
      <div className="App">
          {this.renderApp()}
      </div>
    );
  }
}

export default App;
