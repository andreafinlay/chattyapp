import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageList extends Component {
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

MessageList.propTypes = {
	currentUser: PropTypes.object,
  messages: PropTypes.array
};

export default MessageList;
