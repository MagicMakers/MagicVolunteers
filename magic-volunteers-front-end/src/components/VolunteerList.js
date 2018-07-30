import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getVolunteers, deleteVolunteers } from "../utils/apiServices";
import "./VolunteerList.css";

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

    deleteVolunteer = event => {
        this.state.volunteerArray.map( data => {
            if ( data.id === event.target.className ) {
                deleteVolunteers( data.id ).then( this.setState( {
                    volunteerArray: this.state.volunteerArray.filter( volunteer => volunteer !== data ),
                } ) );
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
        // console.log( `Edit${ event.target }` );
        this.setState( { showRegister: true } );
    };

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
                                <div>{data.name}</div>
                                <div>{data.phone}</div>
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
                <button onClick={ this.addVolunteer }>Add Volunteer </button>
                <Link to="/register">+</Link>
                {this.state.numberOfPages ? (
                    <div className="pagination">
                        <div>
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
                    </div>
                ) : null}
            </div>
        );
    }
}

export default VolunteerList;
