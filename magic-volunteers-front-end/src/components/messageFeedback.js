import React, { Component } from "react";
import PropTypes from "prop-types";

class MessageFeedback extends Component {
    componentDidMount() {
        this.messageTimer = setTimeout( () => {
            this.props.displayMessage();
        }, 3000 );
    }

    componentWillUnmount() {
        clearTimeout( this.messageTimer );
    }

    render() {
        return (
            <div className="message">
                {this.props.message}
            </div>
        );
    }
}

MessageFeedback.propTypes = {
    displayMessage: PropTypes.func.isRequired,
    message: PropTypes.string,
};

MessageFeedback.defaultProps = {
    message: null,
};

export default MessageFeedback;
