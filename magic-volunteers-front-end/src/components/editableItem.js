import React, { Component } from "react";
import PropTypes from "prop-types";

class EditableItem extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            value: props.text,
        };
    }
    handleChange = event => {
        this.props.onUpdate( event.target.value );
        this.setState( { value: event.target.value } );
    };
    render() {
        if ( this.props.isEditable ) {
            return (
                <div className="items-from-list">
                    {this.props.label}:
                    <input
                        name={ this.props.text }
                        id={ this.props.text }
                        type="text"
                        value={ this.state.value }
                        onChange={ this.handleChange }
                        required
                    />
                </div>
            );
        }
        return (
            <div className="items-from-list">{this.props.label}: {this.state.value}</div>
        );
    }
}

EditableItem.propTypes = {
    text: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

EditableItem.defaultProps = {
    text: "",
};

export default EditableItem;
