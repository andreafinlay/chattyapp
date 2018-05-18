import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
// Parses login notifs and user messages and renders accordingly
class MessageList extends Component {
	render() {
		const messageComponent = this.props.messages.map(data => {
			return data.type === 'incomingNotification' ? (
				<Notification
					key={data.id}
					username={data.oldUsername}
					newUsername={data.username}
				/>
			) : (
				<Message
					key={data.id}
					username={data.username}
					content={data.content}
					colour={data.colour}
				/>
			);
		});
		return <main className="messages">{messageComponent}</main>;
	}
}

MessageList.propTypes = {
	messages: PropTypes.array
};

export default MessageList;
