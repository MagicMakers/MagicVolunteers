import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getVolunteers } from "../utils/apiServices";
import "./userSearchComponent.css";

class UserSearchComponent extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            name: "",
            usersList: [],
        };
    }
    handleChange = event => {
        this.setState( { name: event.target.value }, () => {
            this.props.updateAssignedVolunteer( "assignedVolunteer", null );
            getVolunteers( { name: this.state.name } ).then( resp => {
                if ( resp.success ) {
                    this.setState( {
                        usersList: resp.payload.results.slice( 0, 5 ).sort(),
                    } );
                }
            } );
        } );
    };
    handleSelect = ( name, id ) => {
        this.setState( { name } );
        this.props.updateAssignedVolunteer( "assignedVolunteer", id );
        this.setState( { usersList: [] } );
    };
    render() {
        return (
            <div className="mv-form-group">
                <div className="autocomplete">
                    <label>Voluntar asignat</label>
                    { <FontAwesomeIcon className="search-icon" icon="search" /> }
                    <input
                        type="text"
                        name="name"
                        className="search-input"
                        placeholder="Cauta voluntar"
                        onChange={ this.handleChange }
                        value={ this.state.name }
                        onBlur={ () => setTimeout( () => this.setState( { usersList: [] } ), 300 ) }
                    />
                    <div className={ `autocomplete-dropdown-container ${ this.state.usersList.length ? "" : "hide" }` }>
                        {this.state.usersList.map( user => (
                            <div
                                key={ user.id }
                                onClick={ () => this.handleSelect( user.name, user.id ) }
                            >
                                <span>{user.name}</span>
                                <span> ({user.email})</span>
                            </div>
                        ) )}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSearchComponent;
