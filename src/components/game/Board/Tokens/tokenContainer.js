import React  from "react";
import './token.css'

class TokenContainer extends React.Component {
    renderTokens(tokenObject){
        var tokens = []
        console.log(tokenObject)
        for(const key in tokenObject){
            console.log("key: ", key)
            tokens.push(
                <div className="tokenSet">
                    {this.renderToken(key, tokenObject[key])}
                </div>
                )
        }
        console.log(tokens)
        return tokens
    }
    renderToken(token, num){
        var tokens = []
        console.log(num)
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