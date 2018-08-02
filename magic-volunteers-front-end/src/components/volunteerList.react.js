import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getVolunteers, deleteVolunteers } from "../utils/apiServices";
import "./volunteerList.css";

import RegisterForm from "./registerForm.react";

class VolunteerList extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            numberOfPages: 0,
            currentPage: 1,
            volunteerArray: [],
            showRegister: false,
        };
    }

    componentDidMount() {
        this.volunteerListLoad( this.props.match.params.page || this.state.currentPage );
    }

    componentDidUpdate( prevProps ) {
        if ( this.props.match.params.page !== prevProps.match.params.page ) {
            this.volunteerListLoad( this.props.match.params.page || this.state.currentPage );
        }
    }

    initialSMSSend = ( phoneNb ) => {
        console.log( `Initial SMS: ${ phoneNb }` );
    }

    reminderSMS = ( phoneNb ) => {
        console.log( `Reminder SMS: ${ phoneNb }` );
    }

    optionList = {
        0: this.initialSMSSend,
        1: this.reminderSMS,
    }

    deleteVolunteer = event => {
        this.state.volunteerArray.map( data => {
            if ( data.id === event.target.className ) {
                deleteVolunteers( data.id ).then( ( resp ) => {
                    if ( resp.success ) {
                        this.setState( {
                            volunteerArray: this.state.volunteerArray
                                .filter( volunteer => volunteer !== data ),
                        } );
                    }
                } );
            }
            return "";
        } );
    };

    volunteerListLoad = page => {
        getVolunteers( `?take=10&skip=${ ( page - 1 ) * 10 }` ).then( resp => {
            if ( resp.success ) {
                this.setState( {
                    numberOfPages: resp.payload.pagination.numberOfPages,
                    currentPage: resp.payload.pagination.currentPage,
                    volunteerArray: resp.payload.results,
                } );
            }
        } );
    };

    addVolunteer = () => {
        this.setState( { showRegister: true } );
    };

    editVolunteer = () => {
        // console.log( event.target );
        this.setState( { showRegister: true } );
    };

    sendSMS = ( event ) => {
        const phoneNb = event.target.parentNode.children[ 0 ].innerHTML;
        this.optionList[ event.target.parentNode.children[ 1 ].selectedIndex ]( phoneNb );
    }

    cancelRegister = () => {
        this.setState( {
            showRegister: false,
        } );
    };

    render() {
        if ( this.state.showRegister ) {
            return (
                <div className="mv-auth">
                    <button onClick={ this.cancelRegister }> Cancel </button>
                    <RegisterForm />
                </div>
            );
        }
        return (
            <div className="volunteer-list">
                <h1>Volunteer list</h1>
                <ul>
                    {this.state.volunteerArray.map( data => (
                        <li key={ data.id }>
                            <div>
                                <div className="volunteer-name">{data.name}</div>
                                <div>
                                    <div>{data.phone}</div>
                                    <select>
                                        <option>Initial</option>
                                        <option>Reminder</option>
                                    </select>
                                    <button onClick={ this.sendSMS }>Send SMS</button>
                                </div>
                                <button className={ data.id } onClick={ this.editVolunteer }>
                                    Edit
                                </button>
                                <button className={ data.id } onClick={ this.deleteVolunteer }>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ) )}
                </ul>
                <div className="add-button">
                    <button onClick={ this.addVolunteer }>Add Volunteer </button>
                </div>
                {this.state.numberOfPages ? (
                    <div className="pagination">
                        {this.state.currentPage !== 1 ? (
                            <Link to={ `/dashboard/coordinators/${ this.state.currentPage - 1 }` }>
                                {this.state.currentPage - 1}
                            </Link>
                        ) : null}
                        Pagina {this.state.currentPage} din {this.state.numberOfPages}
                        {this.state.currentPage !== this.state.numberOfPages ? (
                            <Link to={ `/dashboard/coordinators/${ this.state.currentPage + 1 }` }>
                                {this.state.currentPage + 1}
                            </Link>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default VolunteerList;
