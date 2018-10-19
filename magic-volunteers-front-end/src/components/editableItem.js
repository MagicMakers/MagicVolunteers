import React, { Component } from "react";
import PropTypes from "prop-types";

class EditableItem extends Component {
    // TODO:
    // CSS
    constructor( props ) {
        super( props );
        this.state = {
            value: props.text,
            options: props.options,
            selected: props.selected,
        };
    }

    handleTextChange = event => {
        const name = this.props.name.split( "." ).reverse();
        this.props.onUpdate( name[ 1 ], name[ 0 ], event.target.value );
        this.setState( { value: event.target.value } );
    };

    handleRadioChange = ( event ) => {
        this.props.onUpdate( null, this.props.name, event.target.value );
        this.setState( {
            selected: event.target.value,
        } );
    }

    render() {
        if ( this.props.isEditable && this.props.type !== "radio" ) {
            return (
                <div className="items-from-list">
                    {this.props.label}:
                    <input
                        name={ this.props.name }
                        id={ this.props.text }
                        type="text"
                        value={ this.state.value }
                        onChange={ this.handleTextChange }
                        required
                    />
                </div>
            );
        } else if ( this.props.isEditable && this.props.type === "radio" ) {
            return (
                <div className="items-from-list">
                    {this.props.label}:
                    {this.state.options.map( ( option ) => (
                        <div key={ option }>
                            <input
                                name={ this.props.name }
                                id={ this.props.text }
                                type="radio"
                                value={ option }
                                onChange={ this.handleRadioChange }
                                checked={ this.state.selected === option }
                            />{option}
                        </div>
                    ) )}

                </div>
            );
        } else if ( !this.props.isEditable && this.props.type === "radio" ) {
            return (
                <div className="items-from-list">
                    {this.props.label}:
                    {this.props.selected}
                </div>
            );
        }
        return (
            <div className="items-from-list" >
                {this.props.label}:
                {this.state.value}
            </div>
        );
    }
}

EditableItem.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.arrayOf( PropTypes.string ),
    selected: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

EditableItem.defaultProps = {
    text: "",
    type: "text",
    options: [],
    selected: "",
};

export default EditableItem;
