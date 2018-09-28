import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getVolunteers, deleteVolunteers } from "../utils/apiServices";
import "./volunteerList.css";

import RegisterForm from "./registerForm.react";
import VolunteerDetails from "./volunteerDetails.react";

class VolunteerList extends Component {
    // TODO:
    // Send SMS Functionality does not work
    // CSS Responsiveness
    constructor( props ) {
        super( props );
        this.state = {
            numberOfPages: 0,
            currentPage: 1,
            volunteerArray: [],
            showRegister: false,
            showVolunteer: false,
            selectedVolunteer: null,
        };
    }

    componentDidMount = () => {
        this.volunteerListLoad( this.props.match.params.page || this.state.currentPage );
    }

    componentDidUpdate = ( prevProps ) => {
        // console.log( prevProps );
        if ( this.props.match.params.page !== prevProps.match.params.page ) {
            this.setState( {
                showRegister: false,
                showVolunteer: false,
            } );
            this.volunteerListLoad( this.props.match.params.page || this.state.currentPage );
        }
    }

    initialSMSSend = () => {
        // console.log( `Initial SMS: ${ phoneNb }` );
    }

    reminderSMS = () => {
        // console.log( `Reminder SMS: ${ phoneNb }` );
    }

    optionList = {
        0: this.initialSMSSend,
        1: this.reminderSMS,
    }

    deleteVolunteer = event => {
        this.state.volunteerArray.map( data => {
            if ( data.id === event.target.className ) {
                deleteVolunteers( data.id ).then( resp => {
                    if ( resp.success ) {
                        this.setState( {
                            volunteerArray: this.state.volunteerArray.filter( volunteer => volunteer !== data ),
                            // TODO: refresh the list
                        } );
                    } else {
                        // TODO: Err handeling
                        // console.log( `err: ${ resp }` );
                    }
                } );
            }
            return "";
        } );
    };

    backToList = () => {
        this.setState( {
            showRegister: false,
            showVolunteer: false,
        } );
    }

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

    volunteerDetails = ( event ) => {
        this.setState( {
            showVolunteer: true,
            selectedVolunteer: event.target.dataset.value,
        } );
    };

    sendSMS = ( event ) => {
        const element = event.target.parentNode.children[ 0 ];
        const phoneNb = element.children[ 0 ].innerHTML;
        this.optionList[ element.children[ 1 ].selectedIndex ]( phoneNb );
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
        } else if ( this.state.showVolunteer ) {
            return (
                <div>
                    <button onClick={ this.backToList }> {"<"}=Back</button>
                    <VolunteerDetails
                        data={ this.state.volunteerArray[ this.state.selectedVolunteer ] }
                    />
                </div>
            );
        }
        return (
            <div className="volunteer-list">
                <ul className="ul-of-volunteers">
                    {this.state.volunteerArray.map( ( data, index ) => (
                        <li key={ data.id }>
                            <div>
                                <div
                                    className="volunteer-name"
                                    onClick={ this.volunteerDetails }
                                    data-value={ index }
                                    onKeyUp={ this.volunteerDetails }
                                    role="button"
                                    tabIndex={ index }
                                >{data.name}
                                </div>
                                <div>
                                    <div className="phone-number">
                                        <div >{data.phone}</div>
                                        <select className="phone-number-select">
                                            <option>Initial</option>
                                            <option>Reminder</option>
                                        </select>
                                    </div>
                                    <button onClick={ this.sendSMS }>Send SMS</button>
                                </div>
                                <button className={ data.id } onClick={ this.deleteVolunteer }>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ) )}
                </ul>
                <div className="buttons">
                    <div className="add-button">
                        <button onClick={ this.addVolunteer }>Add Volunteer </button>
                    </div>

                    {this.state.numberOfPages ? (
                        <div className="pagination">

                            <Link
                                className={ this.state.currentPage !== 1 ? "" : "disabled" }
                                to={ `/dashboard/volunteers/${ this.state.currentPage - 1 }` }
                            >
                                Pagina precedenta
                            </Link>

                            Pagina {this.state.currentPage} din {this.state.numberOfPages}

                            <Link
                                className={ this.state.currentPage !== this.state.numberOfPages ?
                                    "" : "disabled" }
                                to={ `/dashboard/volunteers/${ this.state.currentPage + 1 }` }
                            >
                                Pagina urmatoare
                            </Link>

                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

VolunteerList.propTypes = {
    match: PropTypes.shape( {
        params: PropTypes.shape( {
            page: PropTypes.node,
        } ).isRequired,
    } ).isRequired,
};

export default VolunteerList;
