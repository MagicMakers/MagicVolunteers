import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getVolunteers, deleteVolunteers } from "../utils/apiServices";
import "./volunteerList.css";

import RegisterForm from "./registerForm.react";
import VolunteerDetails from "./volunteerDetails.react";
import MessageFeedback from "./messageFeedback";

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
            message: null,
        };
    }

    componentDidMount = () => {
        this.volunteerListLoad( this.props.match.params.page || this.state.currentPage );
    }

    componentDidUpdate = ( prevProps ) => {
        if ( this.props.match.params.page !== prevProps.match.params.page ) {
            this.setState( {
                showRegister: false,
                showVolunteer: false,
            } );
            this.volunteerListLoad( this.props.match.params.page || this.state.currentPage );
        }
    }

    volunteerListLoad = page => {
        getVolunteers( `?take=10&skip=${ ( page - 1 ) * 10 }` ).then( resp => {
            // console.log( resp );
            if ( resp.success ) {
                this.setState( {
                    numberOfPages: resp.payload.pagination.numberOfPages,
                    currentPage: resp.payload.pagination.currentPage,
                    volunteerArray: resp.payload.results,
                } );
            }
        } );
    };

    sendSMS = ( event ) => {
        const element = event.target.parentNode.children[ 0 ];
        const phoneNb = element.children[ 0 ].innerHTML;
        this.optionList[ element.children[ 1 ].selectedIndex ]( phoneNb );
    }

    optionList = {
        0: this.initialSMSSend,
        1: this.reminderSMS,
    }

    initialSMSSend = () => {
        // console.log( `Initial SMS: ${ phoneNb }` );
    }

    reminderSMS = () => {
        // console.log( `Reminder SMS: ${ phoneNb }` );
    }

    addVolunteer = () => {
        this.setState( { showRegister: true } );
    };

    volunteerDetails = ( event ) => {
        this.setState( {
            showVolunteer: true,
            selectedVolunteer: event.target.dataset.value,
        } );
    };

    deleteVolunteer = event => {
        deleteVolunteers( event.target.dataset.value ).then( resp => {
            if ( resp.success ) {
                this.volunteerListLoad( this.state.currentPage );
                this.setState( {
                    message: "Utilizatorul a fost sters cu success",
                } );
            } else {
                this.setState( {
                    message: `A fost o eroare la stergerea utilizatorului: ${ resp }`,
                } );
            }
            return "";
        } );
    };

    backToList = () => {
        this.setState( {
            showRegister: false,
            showVolunteer: false,
            selectedVolunteer: null,
        } );
    }

    cancelRegister = () => {
        this.setState( {
            showRegister: false,
        } );
    };

    showHideMessage = () => {
        this.setState( {
            message: null,
        } );
    }

    saveData = () => {
        this.volunteerListLoad( this.state.currentPage );
        // console.log( this.state.volunteerArray[ this.state.selectedVolunteer ] );
    }

    render() {
        if ( this.state.showRegister ) {
            return (
                <div className="mv-auth">
                    <button className="mv-btn" onClick={ this.cancelRegister }> Cancel </button>
                    <RegisterForm />
                </div>
            );
        } else if ( this.state.showVolunteer ) {
            return (
                <div>
                    <button className="mv-btn " onClick={ this.backToList }> {"<"}=Back</button>
                    <VolunteerDetails
                        data={ this.state.volunteerArray[ this.state.selectedVolunteer ] }
                        handleEditData={ this.saveData }
                    />
                </div>
            );
        }
        return (
            <div className="volunteer-list">
                {this.state.message ? <MessageFeedback
                    displayMessage={ this.showHideMessage }
                    message={ this.state.message }
                />
                    : null}
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
                                            <option value="initial">Initial</option>
                                            <option value="reminder">Reminder</option>
                                        </select>
                                    </div>
                                    <button
                                        className="mv-btn"
                                        onClick={ this.sendSMS }
                                    >Send SMS
                                    </button>
                                </div>
                                <button
                                    className="mv-btn"
                                    data-value={ data.id }
                                    onClick={ this.deleteVolunteer }
                                >
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
