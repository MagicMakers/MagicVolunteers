import React, { Component } from "react";
import PropTypes from "prop-types";

class EditableItem extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            value: props.text,
            options: props.options,
            selected: props.selected ? props.options[ 1 ] : props.options[ 0 ],
        };
    }
    handleChange = event => {
        const name = this.props.name.split( "." ).reverse();
        this.props.onUpdate( name[ 1 ], name[ 0 ], event.target.value );
        this.setState( { value: event.target.value } );
    };
    handleRadioChange = ( event ) => {
        const coordinatorValue = event.target.value === "coordonator";
        this.props.onUpdate( null, this.props.name, coordinatorValue );
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
                        onChange={ this.handleChange }
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
                    {this.props.selected ? this.props.options[ 1 ] : this.props.options[ 0 ]}
                </div>
            );
        }
        return (
            <div className="items-from-list" > {this.props.label}: {this.state.value}</div>
        );
    }
}

EditableItem.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.arrayOf( PropTypes.string ),
    selected: PropTypes.bool,
    onUpdate: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

EditableItem.defaultProps = {
    text: "",
    type: "text",
    options: [ "voluntar", "coordonator" ],
    selected: true,
};

export default EditableItem;
