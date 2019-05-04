import React from 'react';
import {Link} from 'react-router-dom';
import './chats.css';
import Messages from './Messages';

class Chats extends React.Component{
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const message = this.message.value;
        this.props.sendMessage(message);
        this.form.reset();
    }
    handleLogout()
    {
        this.props.logout();
    }
    
    handleChange(e)
    {
        this.props.handleChange(e.target.value);
    }
     
    render()
    {        
        return(
            <div className="chats-container">
                <div className="chat-box">
                    <div className="chat-area">
                            <Messages messages={this.props.messageState} 
                                      currentmember={this.props.memberState} />
                        <div className="user-message">
                            <form ref={ (form) => this.form = form } onSubmit={this.handleSubmit}>
                                <input type="text" onChange={this.handleChange} placeholder="Type your message here" 
                                       ref={(input)=> this.message = input}/>
                                <button>Send</button>
                            </form>
                        </div>
                    </div>
                    <button type="submit" onClick={this.props.logout} className="logout">
                        <Link to="/">LOG OUT</Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Chats;