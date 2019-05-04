import React from 'react';
import {Redirect} from 'react-router-dom';     
import './Login.css';

class Login extends React.Component{
    constructor(props)
    {
        super();
        this.sendToState = this.sendToState.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
    }
    getUsername(input)
    {
        this.props.username(input.target.value);
    }

    sendToState(e)
    {
        e.preventDefault();
        this.props.submit();
    }


    render(){
        if (this.props.submitState) {
            return <Redirect to = '/user' />
        }
        return(
            <div className="home">
                <form onSubmit={this.sendToState}>
                    <h1>Chatsapp</h1>
                    <h4>LOGiN</h4>
                        <label className="login-input">
                            <input type="text" placeholder="&nbsp;" onChange={this.getUsername}
                                    value={this.props.usernameState} required />
                            <span>Username</span>
                        </label>                        
                        <button  type="submit">LOGIN</button>
                </form>
            </div>
        )
    }
}

export default Login;