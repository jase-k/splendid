import React, { Component } from 'react';
import { bounce, fadeIn, fadeOut, flip, flipInX, hinge, jello, pulse, rubberBand, shake, swing, tada, wobble, zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import SignIn from './SignIn/signin';
import './login.scss'

const styles = {
    bounce: {
        animation: 'x 2s infinite',
        animationName: Radium.keyframes(bounce, 'bounce')
    },
    empty: {
        animation: 'x',
        animationName: Radium.keyframes(bounce, 'bounce')
    },
    fadeIn: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    fadeOut: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(fadeOut, 'fadeOut')
    }, 
    flip: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(flip, "flip")
    }, 
    jello: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(jello, "jello")
    },
    pulse: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(pulse, "pulse")
    },
    rubberBand: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(rubberBand, "rubberBand")
    },
    shake: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(shake, "shake")
    },
    tada: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(tada, "tada")
    },
    wobble: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(wobble, "wobble")
    }, 
    swing: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(swing, "swing")
    },
    flipInX: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(flipInX, "flipInX")
    },
    zoomIn: {
        animation: 'x 4s infinite',
        animationName: Radium.keyframes(zoomIn, "zoomIn")
    }
}
const styleList = [styles.bounce, styles.empty, styles.fadeIn, styles.fadeOut, styles.flip, styles.jello, styles.pulse, styles.rubberBand, styles.shake, styles.tada, styles.wobble, styles.swing, styles.flipInX, styles.zoomIn]

class Login extends Component {

    renderCards(){
        var cards = []
        for(var i = 1; i < 50; i++){
            var cardNum = Math.floor((Math.random()*90)+1)
            var animation = Math.floor(Math.random()*styleList.length)
            cards.push(
                <StyleRoot>
                    <img src={process.env.PUBLIC_URL + "cardImgs/"+cardNum+".png"} className="backgroundCard" style={styleList[animation]} />
                </StyleRoot>
            )
        }
        return cards
    }
    render(){
        return(
            <div className="loginContainer">
                {this.renderCards()}
                <div className ="overlay"></div>
                < SignIn 
                onClick = {()=>{
                    this.toggleIsLogin()
                }}
                />
            </div>
        )
    }
}
export default Login;