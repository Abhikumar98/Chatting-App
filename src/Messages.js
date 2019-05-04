import React from 'react';
import './Messages.css';

class Messages extends React.Component{

    renderMessage(message)
    {
        const {text, member} = message;
        const {currentmember} = this.props;
        const userMessage = member.id === currentmember.id;
        const classname_li = userMessage ? "user-message-right":"";
        const classname_span = userMessage ? "span-background-blue":"";        
            return (
                <li className={classname_li}>
                    <h6>{member.clientData.username}</h6>
                    <span className={classname_span}>{text}</span>
                </li>
            )
        
    }

    render(){        
        return(
            <div className="messages">
                <ul>                 
                    {
                        this.props.messages.map(message => this.renderMessage(message))
                    }
                </ul>
            </div>

        )
    }
}

export default Messages;