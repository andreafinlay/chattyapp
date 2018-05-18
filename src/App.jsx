import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import NavBar from './NavBar.jsx';
// Main app component, contains state for all components
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

		this.socket.onopen = event => {
			console.log('Connected to server');
		};
		// Receives message and notif data from server
		this.socket.onmessage = event => {
			const parsedEvent = JSON.parse(event.data);
			// Parses server response and updates App state accordingly
			switch (parsedEvent.type) {
				case 'incomingMessage':
					const messages = parsedEvent;
					this.setState(prevState => ({
						messages: [...prevState.messages, messages]
					}));
					break;
				case 'incomingNotification':
					const notification = parsedEvent;
					this.setState(prevState => ({
						messages: [...prevState.messages, notification]
					}));
					break;
				case 'userConnect':
					this.setState({ numberOfUsers: parsedEvent.userCount });
					break;
				case 'userDisconnect':
					this.setState({ numberOfUsers: parsedEvent.userCount });
					break;
				case 'colour':
					this.setState({ colour: parsedEvent.colour });
					break;
				default:
					throw new Error('Client Error: Server response type not recognized.');
			}
		};
	}
	// Handler functions called in ChatBar component
	createNewMessage = newMessageInput => {
		const newMessage = {
			type: 'postMessage',
			username: this.state.currentUser.username,
			content: newMessageInput,
			colour: this.state.colour
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
	// Renders all major subcomponents
	render() {
		return (
			<div>
				<MessageList
					messages={this.state.messages}
					colour={this.state.colour}
				/>
				<ChatBar
					username={this.state.currentUser.username}
					createNewMessage={this.createNewMessage}
					updateUser={this.updateUser}
				/>
				<NavBar numberOfUsers={this.state.numberOfUsers} />
			</div>
		);
	}
}

export default App;
