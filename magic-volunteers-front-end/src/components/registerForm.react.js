import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { UserInfo }           from './register-form-components/user-info.react';
import { PersonalInfo }       from './register-form-components/personal-info.react';
import { ProfessionalInfo }   from './register-form-components/professional-info.react';
import { ReferenceInfo }      from './register-form-components/reference-info.react';
import { DriveInfo }          from './register-form-components/drive-info.react';
import { RegistrationResult } from './register-form-components/registration-result';

import { formatRegistrationError } from '../utils/registrationValidationService';

import CredentialsUtils from '../utils/CredentialsUtils';
import './registerForm.css';

class RegisterForm extends Component {
    state = {
        step: 0,
        role: 'volunteer',
        isGDPRCompliant: false,
		email: '',
        projects: {
            proj1: false,
            proj2: false,
            proj3: false,
            proj4: false,
        },
        registrationSuccess: null,
        registrationError: null
    };

    handleSubmit = () => {

        const data = buildData( this.state );

        CredentialsUtils.register(
            data,
            credentials => {
                this.setState( {
                    step: 5,
                    registrationSuccess: credentials
                } );
				CredentialsUtils.storeCredentials( credentials.email, credentials.token );

			},
            err => {
                this.setState( {
                    step: 5,
					registrationError: err.message
			    } )
            },
        );
    };

    handleNext = (fields) => {
        this.setState((state) => {

        	if ( state.step < 4 ) {
				fields.step = state.step + 1;
			}

			return fields;
		} );

    };

	handleSaveDataAndSubmint = (data) => {
		this.handleNext(data);
		setTimeout(() => this.handleSubmit(), 1000);
	};

	setStep = ( step ) => {
		this.setState( {
			step
		})
	};

	renderStep( step ) {
		switch( step ) {
			case 0:
				return <UserInfo handleNext={ this.handleNext } />;
			case 1:
				return <PersonalInfo handleNext={ this.handleNext } />;
            case 2:
                return <ProfessionalInfo handleNext={ this.handleNext } />;
            case 3:
                return <ReferenceInfo handleNext={ this.handleNext } />;
            case 4:
				return <DriveInfo handleNext={ this.handleSaveDataAndSubmint } />;
            case 5:
                return <RegistrationResult success={ this.state.registrationSuccess } error={ this.state.registrationError } onError={ this.setStep } />
		}
    }

    updateData = ( fields ) => {
		for(let key in fields) {
			if(fields.hasOwnProperty(key)) {
				this.setState({
					[key]: fields[key]
				})
			}
		}
    };

    handleProjects = evt => {
        const { target } = evt;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        const newProjectsState = { [ name ]: value };
        this.setState( oldstate => ( {
            projects: Object.assign( {}, oldstate.projects, newProjectsState ),
        } ) );
    };

    render() {
        const { step } = this.state;
        return (
            <div>
                <div className="progress">
                    <div className={ `circle ${ step === 0 ? 'active' : '' } ${step > 0 ? 'done' : '' }` }>
                        <span className="label">1</span>
                    </div>
                    <span className="bar"></span>
                    <div className={ `circle ${ step === 1 ? 'active' : '' } ${step > 1 ? 'done' : '' }` }>
                        <span className="label">2</span>
                    </div>
                    <span className="bar half"></span>
                    <div className={ `circle ${ step === 2 ? 'active' : '' } ${step > 2 ? 'done' : '' }` }>
                        <span className="label">3</span>
                    </div>
                    <span className="bar"></span>
                    <div className={ `circle ${ step === 3 ? 'active' : '' } ${step > 3 ? 'done' : '' }` }>
                        <span className="label">4</span>
                    </div>
                    <span className="bar"></span>
                    <div className={ `circle ${ step === 4 ? 'active' : '' } ${step > 4 ? 'done' : '' }` }>
                        <span className="label">5</span>
                    </div>
                </div>


                <form onSubmit={ this.handleSubmit }>

                    <h1>Inregistrare</h1>
                    {
                        this.renderStep( this.state.step )
					}

                    {/*<button className="mv-btn mv-btn-primary">Inregistrare</button>*/}
                    {/*<div className="mv-info-box">*/}
                        {/*<p>*/}
                            {/*Ai deja un cont? <Link to="/login">Click aici</Link> pentru logare.*/}
                        {/*</p>*/}
                    {/*</div>*/}
                </form>
			</div>
        );
    }
}

function buildData( data ) {
    const projects = {
        proj1: {
            id: 1,
            name: 'Taberele de vara 2018',
        },
        proj2: {
            id: 2,
            name: 'MagicBOX',
        },
        proj3: {
            id: 3,
            name: 'MagicHome Bucuresti',
        },
        proj4: {
            id: 4,
            name: 'MagicHome Cluj',
        },
    };

    const subscribedProjects = Object.keys( data.projects )
        .map( proj => {
            if ( data.projects[ proj ] ) {
                return projects[ proj ];
            }
            return null;
        } )
        .filter( proj => proj );

    return {
        isGDPRCompliant: data.isGDPRCompliant,
        role: data.role,
        name: data.name,
        email: data.email,
        password: data.password,
        dob: data.dob, // new Date
        phone: data.phone,

        address: {
            city: data.city,
            county: data.county,
            details: data.address,
        },

        background: {
            hasExperience: data.hasExperience === 'da',
            jobExperience: data.jobExperience,
            experienceDetails: data.experienceDetails,
        },

        references: {
            name: data.referenceName,
            contactDetails: data.contactDetails,
            relationship: data.relationship,
        },

		personalDrive: data.personalDrive,
        subscribedProjects,
    };
}

export default withRouter( RegisterForm );
