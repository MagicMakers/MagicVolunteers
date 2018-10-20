import React, { Component } from 'react';
import { validateDriveData } from '../../utils/registrationValidationService';

export class DriveInfo extends Component {
	state = {
		personalDrive: '',
		projects: {
			proj1: false,
			proj2: false,
			proj3: false,
			proj4: false,
		},
		errors: {
			personalDriveError: false,
			projectsError: false
		},
		errorMessage: ''
	};

	constructor( props ) {
		super( props );
	}

	handleChange = evt => {
		const { name, value } = evt.target;

		this.setState({
			[name]: value
		})
	};

	handleProjects = evt => {
		const { target: { type, checked, value, name} } = evt;

		const targetValue = type === 'checkbox' ? checked : value;

		const newProjects = Object.assign( { }, this.state.projects );

		newProjects[ name ] = targetValue;

		this.setState( oldstate => ( {
			projects: newProjects,
		} ) );
	};

	validateAndSendData = (e) => {

		e.preventDefault();

		const { personalDrive, projects } = this.state;

		const errorData = validateDriveData( { personalDrive, projects} );

		const { errors, errorMessage } = errorData;

		this.setState( {
			errors,
			errorMessage
		} );


		const isNoError = Object.keys( errors ).every( error => !errors[error] );

		if ( isNoError ) {

			this.props.handleNext( { personalDrive, projects } );
		}
	};


	render() {
		return (
			<div className="mv-fieldset">
				<h3>De ce MagiCAMP?</h3>
				<div className="mv-form-group input-container">
					<label htmlFor="personalDrive">
						De ce iti doresti sa fii voluntar in MagiCAMP?
					</label>
					<input
						name="personalDrive"
						id="personalDrive"
						type="text"
						onChange={ this.handleChange }
						required
					/>
				</div>
				<div className="mv-form-group mv-radio">
					<label>La care dintre programele MagiCAMP ai vrea sa participi?</label>
					<div className="mv-form-group mv-radio">
						<input
							type="checkbox"
							name="proj1"
							id="proj-1"
							value="1"
							onClick={ this.handleProjects }
						/>
						<label htmlFor="proj-1">Taberele de vara 2018</label>
					</div>
					<div className="mv-form-group mv-radio">
						<input
							type="checkbox"
							name="proj2"
							id="proj-2"
							value="2"
							onClick={ this.handleProjects }
						/>
						<label htmlFor="proj-2">MagicBOX</label>
					</div>
					<div className="mv-form-group mv-radio">
						<input
							type="checkbox"
							name="proj3"
							id="proj-3"
							value="3"
							onChange={ this.handleProjects }
						/>
						<label htmlFor="proj-3">MagicHOME Bucuresti</label>
					</div>
					<div className="mv-form-group mv-radio">
						<input
							type="checkbox"
							name="proj4"
							id="proj-4"
							value="4"
							onChange={ this.handleProjects }
						/>
						<label htmlFor="proj-4">MagicHOME Cluj</label>
					</div>
				</div>
				<div className="mv-form-group register-button-container">
					<p className="register-error-text">{this.state.errorMessage}</p>
					<button className="mv-btn mv-btn-secondary" onClick={ this.validateAndSendData }>Inscrie-ma</button>
				</div>
			</div>
		)
	}
}