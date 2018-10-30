import React, { Component } from "react";
import { DialogTitle, DialogContent, Button, DialogActions, TextField, Dialog, Tooltip } from "@material-ui/core";
import AdressSearchComponent from "./addressSearchComponent.react";
import UserSearchComponent from "./userSearchComponent.react";
import { addBox } from "../utils/apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddMagicBoxForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            name: this.props.name || null,
            address: this.props.address || null,
            details: this.props.details || null,
            assignedVolunteer: this.props.assignedVolunteer || null,
            status: this.props.status || "available",
            isActive: this.props.isActive || true,
            error: {
                name: false,
                details: false,
                address: false,
                assignedVolunteer: false,
            },
            saveBtnEnabled: false,
        };
    }
    saveMagicBox = () => {
        const box = { ...this.state };
        if ( !box.assignedVolunteer ) {
            delete box.assignedVolunteer;
        }
        delete box.error;
        delete box.saveBtnEnabled;
        addBox( box ).then( resp => {
            if ( resp.success ) {
                this.props.handleSave();
                this.props.handleClose( true );
            }
        } );
        this.resetFormData();
    }
    handleClose = () => {
        this.resetFormData();
        this.props.handleClose();
    };
    handleChange = event => {
        this.setState( { [ event.target.name ]: event.target.value } );
    };
    updateData = ( data, value ) => {
        if ( value ) {
            this.handleError( data, false );
        }
        this.setState( { [ data ]: value } );
    };
    handleBlur = ( input, data ) => {
        if ( data || input === "assignedVolunteer" ) {
            this.handleError( input, false );
        } else {
            this.handleError( input, true );
        }
    };
    handleError = ( input, error ) => {
        this.setState( state => ( {
            error: {
                ...state.error,
                [ input ]: error,
            },
        } ), () => {
            const err = Object.values( this.state ).slice( 0, 3 ).find( val => !val );
            if ( err === null || this.state.error.assignedVolunteer ) {
                this.setState( { saveBtnEnabled: false } );
            } else {
                this.setState( { saveBtnEnabled: true } );
            }
        } );
    }
    resetFormData = () => {
        this.setState( {
            name: this.props.name || null,
            address: this.props.address || null,
            details: this.props.details || null,
            assignedVolunteer: this.props.assignedVolunteer || null,
            status: this.props.status || "available",
            isActive: this.props.isActive || true,
            error: {
                name: false,
                details: false,
                address: false,
                assignedVolunteer: false,
            },
            saveBtnEnabled: false,
        } );
    }
    render() {
        return (
            <div>
                <Dialog
                    open={ this.props.open }
                >
                    <h1 className="title">Magic Box</h1>
                    <DialogContent>
                        <div className="mv-form-group add-magic-box">
                            <div className="mv-form-group">
                                <label htmlFor="name">Nume</label>
                                { this.state.error.name ?
                                    <Tooltip title="Numele este obligatoriu">
                                        <FontAwesomeIcon className="error-icon" icon="exclamation-circle" />
                                    </Tooltip>
                                    : "" }
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Nume"
                                    value={ this.state.name || "" }
                                    onChange={ event => this.handleChange( event ) }
                                    onBlur={ () => this.handleBlur( "name", this.state.name ) }
                                />
                            </div>
                            <div
                                tabIndex="0"
                                onBlur={ () => this.handleBlur( "address", this.state.address ) }
                                className="mv-form-group"
                            >
                                { this.state.error.address ?
                                    <Tooltip title="Selecteaza o adresa valida">
                                        <FontAwesomeIcon className="error-icon" icon="exclamation-circle" />
                                    </Tooltip>
                                    : "" }
                                <AdressSearchComponent
                                    updateAddress={ this.updateData }
                                />
                            </div>
                            <div className="mv-form-group">
                                <label>Detalii</label>
                                { this.state.error.details ?
                                    <Tooltip title="Detaliile sunt obligatorii">
                                        <FontAwesomeIcon className="error-icon" icon="exclamation-circle" />
                                    </Tooltip>
                                    : "" }
                                <input
                                    name="details"
                                    type="text"
                                    placeholder="Detalii"
                                    value={ this.state.details || "" }
                                    onChange={ event => this.handleChange( event ) }
                                    onBlur={ () => this.handleBlur( "details", this.state.details ) }
                                />
                            </div>
                            <div
                                className="mv-form-group"
                                tabIndex="0"
                                onBlur={ () => this.handleBlur( "assignedVolunteer", this.state.assignedVolunteer ) }
                            >
                                { this.state.error.assignedVolunteer ?
                                    <Tooltip title="Selecteaza un voluntar existent">
                                        <FontAwesomeIcon className="error-icon" icon="exclamation-circle" />
                                    </Tooltip>
                                    : "" }
                                <UserSearchComponent
                                    updateAssignedVolunteer={ this.updateData }
                                />
                            </div>
                            <div className="mv-form-group">
                                <label>Status</label>
                                <select
                                    className="mv-select"
                                    name="status"
                                    value={ this.state.status }
                                    onChange={ event => this.handleChange( event ) }
                                >
                                    <option value="available">Disponibil</option>
                                    <option value="assigned">Alocat</option>
                                    <option value="confirmed">Confirmat</option>
                                    <option value="delivered">Livrat</option>
                                </select>
                            </div>
                            <div className="mv-form-group">
                                <label>Activ</label>
                                <select
                                    className="mv-select"
                                    name="isActive"
                                    value={ this.state.isActive }
                                    onChange={ event => this.handleChange( event ) }
                                >
                                    <option value="true">Da</option>
                                    <option value="false">Nu</option>
                                </select>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions
                        className="mv-action"
                    >
                        <div>
                            <button className="mv-btn mv-btn-primary" onClick={ this.handleClose }>Anuleaza</button>
                        </div>
                        <div>
                            <button
                                disabled={ !this.state.saveBtnEnabled }
                                className={ `mv-btn mv-btn-primary ${ this.state.saveBtnEnabled ? "" : "mv-btn-disabled" }` }
                                onClick={ this.saveMagicBox }
                            >
                                Salveaza
                            </button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddMagicBoxForm;
