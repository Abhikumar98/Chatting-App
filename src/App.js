import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Login';
import Chats from './Chats';

class App extends React.Component{
  constructor(props){
    super();
    this.state = {
      submit: false,
      text: "",
      messages: [],
      member: {
        username: "",
      },
  }
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    // scaleDrone code

        this.drone = new window.Scaledrone("lwvrQU97F0P8bIC8", {
            data: this.state.member
        });
        this.drone.on('open', error => {
            if (error) {
            return console.error(error);
            }
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.setState({member});
        });

        const room = this.drone.subscribe("observable-room");
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data});
            this.setState({messages});
        });

        //scaleDrone code end
  }
  changeUsername(name)
  {
    // this.setState({
    //   member : {
    //     username: name
    //   }
    // });
  }
  changePassword(passwrd) 
  {
    this.setState({
      password: passwrd
    })
  }
  formSubmitted()
  {
    this.setState({
      submit : true
    })
  }
  logout()
  {
    console.log("logout!!!");
    this.setState({
      submit: false,
      username: "",
      password: ""
    })
  }
  handleChange(textinput) {
    this.setState({
      text: textinput
    })
  }
  sendMessage(message) {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
  render(){
    return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={
                      () =>  <Login username={this.changeUsername} 
                                        usernameState={this.state.username} 
                                        password={this.changePassword} 
                                        passwordState={this.state.password} 
                                        submit={this.formSubmitted}
                                        submitState={this.state.submit} />
                    }/>
                    <Route path="/user" render={
                      () => <Chats username = {this.state.username}
                                        handleChange = {this.handleChange}
                                        changeText={this.updateText}
                                        messageState={this.state.messages}
                                        textState={this.state.text}
                                        memberState={this.state.member}
                                        logout = {this.logout} 
                                        logoutState={this.state.submit}
                                        sendMessage = {this.sendMessage}
                                        />
                    } />                    
                </Switch>
            </BrowserRouter>
    )
  }
}

export default App;