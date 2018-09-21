import React, { Component } from 'react';
import { validateProfessionalData } from '../../utils/registrationValidationService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const activities = [
	{
		label: 'Medic',
		value: 'medic',
		id: 1,
	},
	{
		label: 'IT',
		value: 'it',
		id: 2,
	},
	{
		label: 'Asistent medical',
		value: 'asistent_medical',
		id: 3,
	},
	{
		label: 'Asistent social',
		value: 'asistent_social',
		id: 4,
	},
	{
		label: 'Psiholog',
		value: 'psiholog',
		id: 5,
	},
	{
		label: 'Economist',
		value: 'economist',
		id: 6,
	},
	{
		label: 'Juridic',
		value: 'juridic',
		id: 7,
	},
	{
		label: 'Constructii',
		value: 'constructii',
		id: 8,
	},
	{
		label: 'Artist',
		value: 'artist',
		id: 9,
	},
];


export class ProfessionalInfo extends Component {
	state = {
		jobExperience: '',
		experienceDetails: '',
		hasExperience: '',
		errors: {
			hasError: false,
			experienceDetailsError: false
		},
		errorMessage: ''
	};

	constructor( props ) {
		super( props );
	}

	buildActivities( ) {
		return activities.map( ( activity, index ) => (
			<div className="mv-form-group mv-radio" key={ index }>
				<input
					type="radio"
					name="jobExperience"
					value={ activity.value }
					id={ activity.value }
					onChange={ this.handleChange }
					required
				/>
				<label htmlFor={ activity.value }>{ activity.label }</label>
			</div>
		) );
	}

	handleChange = evt => {
		const { name, value } = evt.target;

		this.setState({
			[name]: value
		})
	};

	validateAndSendData = (e) => {
		e.preventDefault();

		const { jobExperience, experienceDetails, hasExperience	} = this.state;

		const errorData = validateProfessionalData( { jobExperience, experienceDetails, hasExperience } );

		const { errors, errorMessage } = errorData;
		this.setState({
			errors,
			errorMessage
		});

		if( !errors.hasError ) {

			this.props.handleNext( { jobExperience, experienceDetails, hasExperience } );
		}
	};

	render() {

		const allActivities = this.buildActivities( );
		const { experienceDetailsError } = this.state.errors;

		return (
			<div className="mv-fieldset">
				<h3>Activitate profesionala:</h3>
				<div className="mv-activities">
					{ allActivities }
					<div className="mv-form-group mv-radio">
						<input
							type="radio"
							name="jobExperience"
							value=""
							id="altele"
							onChange={ this.handleChange }
						/>
						<label htmlFor="other">Altceva:</label>
						<input
							type="text"
							name="jobExperience"
							id="other"
							onChange={ this.handleChange }
						/>
					</div>
				</div>
				<div className="mv-form-group input-container">
					<label htmlFor="experienceDetails">Ai experienta in lucrul cu copiii?</label>
					{ experienceDetailsError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="experienceDetails"
						id="experienceDetails"
						type="text"
						className={ `login-input ${ experienceDetailsError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>
				<div className="mv-form-group mv-radio">
					<label>Ai mai facut voluntariat?</label>
					<div className="mv-form-group mv-radio">
						<input
							type="radio"
							name="hasExperience"
							id="da"
							value="da"
							onChange={ this.handleChange }
							required
						/>
						<label htmlFor="da">Da</label>
					</div>
					<div className="mv-form-group mv-radio">
						<input
							type="radio"
							name="hasExperience"
							id="nu"
							value="nu"
							onChange={ this.handleChange }
							required
						/>
						<label htmlFor="nu">Nu</label>
					</div>
				</div>
				<div className="mv-form-group register-button-container">
					<p className="register-error-text">{this.state.errorMessage}</p>
					<button className="mv-btn mv-btn-secondary" onClick={ this.validateAndSendData }>Urmatorul Pas</button>
				</div>
			</div>
		)
	}
}