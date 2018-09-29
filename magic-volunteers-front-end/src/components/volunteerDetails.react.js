import React, { Component } from "react";
import PropTypes from "prop-types";

import { getBoxesByAssignedVolunteer, editVolunteer } from "../utils/apiServices";
import EditableItem from "./editableItem";

class VolunteerDetails extends Component {
    // TODO:
    // state problems???
    // Update state and list
    // Error handling
    constructor( props ) {
        super( props );
        this.state = {
            data: this.props.data,
            personalBoxList: [],
            isEditable: false,
        };
    }
    componentDidMount = () => {
        getBoxesByAssignedVolunteer( this.props.data._id )
            .then( resp => {
                if ( resp.success ) {
                    this.setState( {
                        personalBoxList: resp.payload.results,
                    } );
                }
            } );
    }

    updateData = ( location, name, value ) => {
        if ( location ) {
            this.setState( prevState => ( {
                data: {
                    ...prevState.data,
                    [ location ]: {
                        ...prevState.data[ location ],
                        [ name ]: value,
                    },
                },
            } ) );
        } else {
            this.setState( prevState => ( {
                data: {
                    ...prevState.data,
                    [ name ]: value,
                },
            } ) );
        }
    };

    handleSaveData = () => {
        editVolunteer( this.state.data ).then( resp => {
            console.log( resp );
        } );
        this.handleEdit();
    };

    handleEdit = () => {
        this.setState( { isEditable: !this.state.isEditable } );
    }

    render() {
        return (
            <div className="content">
                <h3>Detalii voluntar</h3>
                {this.props.data ?

                    <div>

                        <h3>Date personale:</h3>
                        <div>
                            <EditableItem
                                name="name"
                                label="Nume"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.name }
                                onUpdate={ this.updateData }
                            />
                        </div>

                        <div>
                            <EditableItem
                                name="email"
                                label="Email"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.email }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                name="phone"
                                label="Telefon"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.phone }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                name="dob"
                                label="Data nasterii"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.dob }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <h3>Adresa:</h3>
                        <EditableItem
                            name="address.city"
                            label="Oras"
                            isEditable={ this.state.isEditable }
                            text={ this.state.data.address.city }
                            onUpdate={ this.updateData }
                        />
                        <EditableItem
                            name="address.county"
                            label="Judet"
                            isEditable={ this.state.isEditable }
                            text={ this.state.data.address.county }
                            onUpdate={ this.updateData }
                        />
                        <EditableItem
                            name="address.details"
                            label="Strada"
                            isEditable={ this.state.isEditable }
                            text={ this.state.data.address.details }
                            onUpdate={ this.updateData }
                        />
                        <h3>Experienta:</h3>
                        {this.state.data.background ?
                            <div>
                                <EditableItem
                                    name="background.experienceDetails"
                                    label="Detalii experienta"
                                    isEditable={ this.state.isEditable }
                                    text={ this.state.data.background.experienceDetails }
                                    onUpdate={ this.updateData }
                                />
                                <EditableItem
                                    name="background.jobExperience"
                                    label="Job experience"
                                    isEditable={ this.state.isEditable }
                                    text={ this.state.data.background.jobExperience }
                                    onUpdate={ this.updateData }
                                />
                            </div>
                            : <div>No Experience</div>
                        }
                        <div>
                            <EditableItem
                                name="personalDrive"
                                label="Personal Drive"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.personalDrive }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                name="isCoordinator"
                                label="Rol"
                                isEditable={ this.state.isEditable }
                                selected={ this.state.data.isCoordinator }
                                options={ [ "voluntar", "coordonator" ] }
                                type="radio"
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <h3>Referinta</h3>
                        <div>

                            <EditableItem
                                name="references.name"
                                label="Nume Referinta"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.references.name }
                                onUpdate={ this.updateData }
                            />
                            <EditableItem
                                name="references.relationship"
                                label="Relatie cu referinta"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.references.relationship }
                                onUpdate={ this.updateData }
                            />
                            <EditableItem
                                name="references.contactDetails"
                                label="Contact Referinta"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.references.contactDetails }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <h3>Proiecte</h3>
                            <ol>
                                {this.state.data.subscribedProjects.map( project => (
                                    project ?
                                        <li key={ project._id } className="items-from-list">
                                            {project.name}
                                        </li>
                                        : ""
                                ) )}
                            </ol>

                        </div>
                        <div className="items-from-list">
                            isGDPRCompliant: {this.state.data.isGDPRCompliant ? "Yes" : "No"}
                        </div>

                        <div className="items-from-list">
                            Createad at: {this.state.data.createdAt}
                        </div>
                        <div className="items-from-list">
                            updatedAt: {this.state.data.updatedAt}

                        </div>
                        <h3>Boxes:</h3>
                        <div className="items-from-list">
                            {this.state.personalBoxList.length ?
                                <ul>
                                    {this.state.personalBoxList.map( box => (
                                        <li key={ box.id }>{box.name} {box.status}</li>
                                    ) )
                                    }
                                </ul>
                                : "No Boxes"
                            }
                        </div>
                    </div>
                    : ""
                }
                <div>
                    {this.state.isEditable ?
                        <button onClick={ this.handleSaveData }>Save</button>
                        : ""}
                    <button onClick={ this.handleEdit }>
                        {this.state.isEditable ? "Cancel" : "Edit"}
                    </button>
                </div>
            </div >
        );
    }
}

VolunteerDetails.propTypes = {
    data: PropTypes.shape().isRequired,
};

export default VolunteerDetails;
