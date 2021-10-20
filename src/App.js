import logo from './logo.svg';
import Login from './components/Login/login'
import Game from './components/game/game'
import './App.css';
import gameData from './SampleGame'
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        loggedIn: false,
        gameData: gameData,
    }
  }
  renderApp(){
    if(this.state.loggedIn){
      return(<Game game={gameData} />)
    }
    else{
      return(< Login />)
    }
  }
  render(){
    return (
      <div className="App">
         { this.renderApp()}
      </div>
    );
  }
}

export default App;
