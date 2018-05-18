import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Renders user name update notification
class Notification extends Component {
	render() {
		return (
			<div className="message system">
				{this.props.username} changed their name to {this.props.newUsername}
			</div>
		);
	}
}

Notification.propTypes = {
	username: PropTypes.string,
	newUsername: PropTypes.string
};

export default Notification;
