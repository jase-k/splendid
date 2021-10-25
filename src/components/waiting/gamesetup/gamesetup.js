import {React, Component } from 'react';
import './gamesetup.css'

class GameSetup extends Component {
    renderCharacters(){
        var characters = [(<option disabled defaultValue value> --Select Your Character -- </option> )]
        var names = ["-","Space Boy", "Space Girl", "Buzz The Bee", "Michael Knight", "Roberto", "Chunky the Penguin", "Space Sister", "Space Baby" ]
        for(var i =1; i < 9; i++){
            characters.push(
                <option value={i}>{names[i]}</option>
            )
        }
        return characters
    }
    updateCharacter(e){
        var charContainer = document.getElementById('character')
        charContainer.innerHTML = `<img src=${process.env.PUBLIC_URL +'/characters/'+e.target.value+'.png'} className='character' >`
        console.log(e.target.value)
    }
    renderGameID(e){
        var idContainer = document.getElementById('gameId')
        var startButton = document.getElementById('start_game')
        if(e.target.value === 'join_game'){
            idContainer.innerHTML = `<input type='number' placeholder='game id' name='game_id' id='game_id'/>`
            startButton.value = 'Join!'
        }
        else{
            idContainer.innerHTML = ``
            startButton.value = 'Start!'
        }
    }
    render(){
        return(
            <div className='signinContainer'>
                <form>
                    <select onChange={this.renderGameID} id="join_start">
                        <option value="new_game">New Game</option>
                        <option value="join_game">Join Game</option>
                    </select>
                    <div id="gameId">
                    </div>
                    <br />
                    <select onChange={this.updateCharacter} id="character_id">
                        {this.renderCharacters()}
                    </select>
                    <div id="character">

                    </div>
                    <input type='button' value='Start' onClick={this.props.startgame} id="start_game"/>
                </form>
                <div class="drops">
                        <div class="drop drop-1"></div>
                        <div class="drop drop-2"></div>
                        <div class="drop drop-3"></div>
                        <div class="drop drop-4"></div>
                        <div class="drop drop-5"></div>
                    </div>
            </div>
        )
    }
}
export default GameSetup