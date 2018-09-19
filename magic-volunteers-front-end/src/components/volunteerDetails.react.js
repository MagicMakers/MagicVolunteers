import React, { Component } from "react";
import PropTypes from "prop-types";

import { getBoxesByAssignedVolunteer } from "../utils/apiServices";
import EditableItem from "./editableItem";

class VolunteerDetails extends Component {
    // TODO:
    // Make edit work
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

    updateData = () => {
        // console.log( value );
        // console.log( event );
        // console.log( this.state );
    }

    handleSaveData = () => {
        this.handleEdit();
    }

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
                                label="Nume"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.name }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                label="Nume Utilizator"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.username }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                label="Email"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.email }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                label="Telefon"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.phone }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                label="Data nasterii"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.dob }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <h3>Adresa:</h3>
                        <EditableItem
                            label="Oras"
                            isEditable={ this.state.isEditable }
                            text={ this.state.data.address.city }
                            onUpdate={ this.updateData }
                        />
                        <EditableItem
                            label="Judet"
                            isEditable={ this.state.isEditable }
                            text={ this.state.data.address.county }
                            onUpdate={ this.updateData }
                        />
                        <EditableItem
                            label="Strada"
                            isEditable={ this.state.isEditable }
                            text={ this.state.data.address.details }
                            onUpdate={ this.updateData }
                        />
                        <h3>Experienta:</h3>
                        {this.state.data.background ?
                            <div>
                                <EditableItem
                                    label="Detalii experienta"
                                    isEditable={ this.state.isEditable }
                                    text={ this.state.data.background.experienceDetails }
                                    onUpdate={ this.updateData }
                                />
                                <EditableItem
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
                                label="Personal Drive"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.personalDrive }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <div>
                            <EditableItem
                                label="Rol"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.role }
                                onUpdate={ this.updateData }
                            />
                        </div>
                        <h3>Referinta</h3>
                        <div>

                            <EditableItem
                                label="Nume Referinta"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.references.name }
                                onUpdate={ this.updateData }
                            />
                            <EditableItem
                                label="Relatie cu referinta"
                                isEditable={ this.state.isEditable }
                                text={ this.state.data.references.relationship }
                                onUpdate={ this.updateData }
                            />
                            <EditableItem
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
                                    project ? <li key={ project._id } > {project.name}</li> : ""
                                ) )}
                            </ol>

                        </div>
                        <div>
                            isGDPRCompliant: {this.state.data.isGDPRCompliant ? "Yes" : "No"}
                        </div>

                        <div>
                            Createad at: {this.state.data.createdAt}
                        </div>
                        <div>
                            updatedAt: {this.state.data.updatedAt}

                        </div>
                        <h3>Boxes:</h3>
                        <div>
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
            </div>
        );
    }
}

VolunteerDetails.propTypes = {
    data: PropTypes.shape().isRequired,
};

export default VolunteerDetails;
