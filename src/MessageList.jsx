import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		const messageListItems = this.props.messages.map(message => {
			return (
				<Message
					key={message.id}
					username={message.username}
					content={message.content}
				/>
			);
		});

		return (
			<main className="messages">
				{messageListItems}
				<div className="message system">
					Anonymous1 changed their name to nomnom.
				</div>
			</main>
		);
	}
}

MessageList.propTypes = {
	currentUser: PropTypes.object,
  messages: PropTypes.array
};

export default MessageList;
