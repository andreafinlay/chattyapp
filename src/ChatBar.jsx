import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ChatBar extends Component {

  handleNewMessage = event => {
    const newMessageValue = event.target.value;
      if(event.charCode === 13) {
          this.props.createNewMessage(newMessageValue);
          event.target.value = "";
      }
      return newMessageValue;
    }

  handleUserUpdate = event => {
    const newUserValue = event.target.value;
      if(event.charCode === 13) {
        this.props.updateUser(newUserValue);
      }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          onKeyPress={this.handleUserUpdate}
          className="chatbar-username"
          placeholder="Enter a username"
        />
        <input
          onKeyPress={this.handleNewMessage}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    )
  }
}

ChatBar.propTypes = {
  currentUser: PropTypes.object
};

export default ChatBar;
