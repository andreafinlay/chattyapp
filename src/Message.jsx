import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {

  render () {
    console.log('message', this.props);
    const colour = this.props.colour;
    return(
      <div className="message">
        <span style={{color: colour}} className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
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
