import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Component for changing username and entering messages
class ChatBar extends Component {
	// Handler functions parse messages and user name update notifs
	handleNewMessage = event => {
		const newMessageValue = event.target.value;
		if (event.charCode === 13) {
			this.props.createNewMessage(newMessageValue);
			event.target.value = '';
		}
	};

	handleUserUpdate = event => {
		const newUserValue = event.target.value;
		if (event.charCode === 13) {
			this.props.updateUser(newUserValue, this.props.username);
		}
	};
	// Renders username bar and message bar, calls handler functions
	render() {
		return (
			<footer className="chatbar">
				<input
					className="chatbar-username"
					defaultValue={this.props.username}
					onKeyPress={this.handleUserUpdate}
					placeholder="Enter a username"
				/>
				<input
					className="chatbar-message"
					onKeyPress={this.handleNewMessage}
					placeholder="Type a message and hit ENTER"
				/>
			</footer>
		);
	}
}

ChatBar.propTypes = {
	username: PropTypes.string
};

export default ChatBar;
