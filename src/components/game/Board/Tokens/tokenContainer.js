import React  from "react";
import './token.css'

class TokenContainer extends React.Component {
    renderTokens(tokenObject){
        var tokens = []
        for(const key in tokenObject){
            tokens.push(
                <div className={"tokenSet "+key}
                onClick={this.props.selectToken}
                >
                    {this.renderToken(key, tokenObject[key])}
                </div>
                )
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