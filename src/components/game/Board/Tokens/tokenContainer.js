import React  from "react";
import './token.css'

class TokenContainer extends React.Component {
    renderTokens(tokenObject){
        var tokens = []
        var clickFunction = this.props.selectToken
        if(this.props.currentTurn.reserveCard){
            clickFunction = () => {}
        }
        for(const key in tokenObject){
            if(tokenObject[key] === 0){
                tokens.push(
                    <div className={"tokenSet "+key}
                    onClick={() => {}}
                    >
                        {this.renderToken(key, tokenObject[key])}
                    </div>
                    )
            }
            else{
                tokens.push(
                    <div className={"tokenSet "+key}
                    onClick={clickFunction}
                    key={key}
                    >
                        {this.renderToken(key, tokenObject[key])}
                    </div>
                    )
            }
        }
        return tokens
    }
    renderToken(token, num){
        var tokens = []
        for(var i = num; i > 0; i--){
            tokens.push(
                <img 
                src={process.env.PUBLIC_URL + '/tokenImgs/'+token+'.svg'} 
                className={"tokenImg a"+i} 
                style={{
                    position: "absolute",
                    top: 2*i,
                    left: 2*i
                }}
                alt="token"
                key={i}
                />
                )
        }
        return tokens
    }
    render(){
        return(
            <div className="tokenContainer">
                {this.renderTokens(this.props.tokens)}
            </div>
        )
    }
}
export default TokenContainer;