import logo from './logo.svg';
import Header from './components/header/header'
import Game from './components/game/game'
import './App.css';
import gameData from './SampleGame'

function App() {
  return (
    <div className="App">
        <Header />
        <Game game={gameData}/>
    </div>
  );
}

export default App;
