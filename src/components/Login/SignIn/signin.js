import React, { Component } from 'react';


class SignIn extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLogin : true
        }
        this.toggleIsLogin = this.toggleIsLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }
    toggleIsLogin(){
        this.setState({
                isLogin : !this.state.isLogin
            })
    }
    handleRegister(){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/users/new', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log(xhr.response)
            }
        }
        var data = {
            "username" : document.querySelector('#username').value,
            "password" : document.querySelector('#password').value,
            "confirm" : document.querySelector('#confirm').value
        }
        xhr.send(data);
    }
    renderForm(){
        if(this.state.isLogin){
            return(
                <form id="registration_form">
                    <h1>Splendid</h1>
                    <p>Login</p>
                    <input type="text" placeholder="UserName" name="username" id="username"/>
                    <input type="password"placeholder="Password" name="password" id="password"/>
                    <input type="submit" value="Login" onClick={this.handleRegister} return false />
                    <br />
                    <a href="#">Forgot Password?</a>
                    <br />
                    <a onClick={this.toggleIsLogin} return false>Register</a>
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
                    <input type="button" value="Register" onClick={this.handleRegister}/>
                    <br />
                    <a href="#">Forgot Password?</a>
                    <br />
                    <a onClick={this.toggleIsLogin}>Login</a>
                </form>
            )
        }
    }
    render(){
        return(
            <div className="signinContainer">
                {this.renderForm()}
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
export default SignIn;