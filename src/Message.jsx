import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Renders user colour and message content
class Message extends Component {
	render() {
		const colour = this.props.colour;
		return (
			<div className="message">
				<span style={{ color: colour }} className="message-username">
					{this.props.username}
				</span>
				<span className="message-content">{this.props.content}</span>
			</div>
		);
	}
}

Message.propTypes = {
	username: PropTypes.string,
	content: PropTypes.string,
	colour: PropTypes.string
};

export default Message;
