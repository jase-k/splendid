import React from 'react';
import './character.css'

class Character extends React.Component{
    
    render(){
        return(
            <div className= {"characterContainer "+this.props.side}>
                <div className = {"reservedCards "+this.props.side}>1</div>
                <div className = {"character "+this.props.side}>
                    <p className={"score "+this.props.side}><span>5</span></p>
                    <img src={process.env.PUBLIC_URL+"/characters/"+this.props.player.character_id+".png"} 
                    className={"character active "+this.props.side}
                    />
                </div>
            </div>
        )
    }
}
export default Character