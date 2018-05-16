import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Message from './Message';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: {},
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

			this.socket.onmessage = newMessage => {
				const messages = JSON.parse(newMessage.data);
				console.log(messages);
				this.setState(prevState => ({ messages: [messages, ...prevState.messages] }))
				console.log(this.state);
			}
	}

	createNewMessage = newMessageInput => {
		const newMessage = {
			username: this.state.currentUser.name,
			content: newMessageInput
		};
		this.socket.send(JSON.stringify(newMessage));
	};

	updateUser = newUserInput => {
		const newUser = {
			name: newUserInput
		}
		this.setState({ currentUser: newUser })
		this.socket.send(JSON.stringify(newUser));
	}

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
					currentUser={this.state.currentUser}
					createNewMessage={this.createNewMessage}
					updateUser={this.updateUser}
				/>
			</div>
		);
	}
}

export default App;
