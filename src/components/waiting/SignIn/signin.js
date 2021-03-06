import React, { Component } from 'react';


class SignIn extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLogin : true
        }
        this.toggleIsLogin = this.toggleIsLogin.bind(this)
    }
    toggleIsLogin(){
        this.setState({
                isLogin : !this.state.isLogin
            })
    }
    renderForm(){
        console.log(this.props)
        if(this.state.isLogin){
            return(
                <form id="registration_form">
                    <h1>Splendid</h1>
                    <p>Login</p>
                    <input type="text" placeholder="UserName" name="username" id="username"/>
                    <input type="password"placeholder="Password" name="password" id="password"/>
                    <input type="button" value="Login" onClick={this.props.login} />
                    <br />
                    {/* <a href="#">Forgot Password?</a> */}
                    <br />
                    <button onClick={this.toggleIsLogin} className="switch">Register</button>
                </form>
            )
        }
        else{
            return(
                <form id="registration_form">
                    <h1>Splendid</h1>
                    <p>Register</p>
                    <input type="text" placeholder="UserName" name="username" id="username"/>
                    <input type="email" placeholder="Email" name="email" id="email"/>
                    <input type="password"placeholder="Password" name="password" id="password"/>
                    <input type="password" placeholder="Confirm Password" name="confirm" id="confirm"/>
                    <br />
                    <input type="button" value="Register" onClick={this.props.register}/>
                    <br />
                    {/* <a href="#">Forgot Password?</a> */}
                    <br />
                    <button onClick={this.toggleIsLogin} className="switch">Login</button>
                </form>
            )
        }
    }
    render(){
        return(
            <div className="signinContainer">
                {this.renderForm()}
                    <div className="drops">
                        <div className="drop drop-1"></div>
                        <div className="drop drop-2"></div>
                        <div className="drop drop-3"></div>
                        <div className="drop drop-4"></div>
                        <div className="drop drop-5"></div>
                    </div>
            </div>
        )
    }
}
export default SignIn;