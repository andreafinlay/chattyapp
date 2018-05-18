import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Renders app logo and number of online users
class NavBar extends Component {
	render() {
		return (
			<nav className="navbar">
				<a href="/" className="navbar-brand">
					Chatty
				</a>
				<div className="user-count">
					{this.props.numberOfUsers} user(s) online
				</div>
			</nav>
		);
	}
}

NavBar.propTypes = {
	numberOfUsers: PropTypes.number
};

export default NavBar;
