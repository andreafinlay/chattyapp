import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Message from './Message';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: { username: 'Anonymous' },
			messages: []
		};
	}

	componentDidMount() {
		this.socket = new WebSocket(
			process.env.REACT_APP_SOCKET_SERVER || 'ws://localhost:3001'
		);

		this.socket.onopen = function(event) {
			console.log('Connected to server');
		};

    this.socket.onmessage = (event) => {

      const parsedEvent = JSON.parse(event.data);

      switch(parsedEvent.type) {
        case "incomingMessage":
          console.log(1, parsedEvent);
          const messages = parsedEvent;
          this.setState(prevState => ({ messages: [...prevState.messages, messages]}));
          break;
        case "incomingNotification":
          console.log(2, parsedEvent);
          const notification = parsedEvent;
          this.setState(prevState => ({ messages: [...prevState.messages, notification]}));
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

	createNewMessage = newMessageInput => {
		const newMessage = {
			type: 'postMessage',
			username: this.state.currentUser.username,
			content: newMessageInput
		};
		this.socket.send(JSON.stringify(newMessage));
	};

	updateUser = (newUserInput, oldUser) => {
		const newUser = {
			type: 'postNotification',
			username: newUserInput,
			oldUsername: oldUser
		};
		this.setState({ currentUser: newUser });
		this.socket.send(JSON.stringify(newUser));
	};

	render() {
		return (
			<div>
				<nav className="navbar">
					<a href="/" className="navbar-brand">
						Chatty
					</a>
				</nav>
				<MessageList messages={this.state.messages} />
				<ChatBar
					username={this.state.currentUser.username}
					createNewMessage={this.createNewMessage}
					updateUser={this.updateUser}
				/>
			</div>
		);
	}
}

export default App;
