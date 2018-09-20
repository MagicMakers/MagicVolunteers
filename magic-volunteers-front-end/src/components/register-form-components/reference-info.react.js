import React, { Component } from 'react';

import { validateReferenceData } from '../../utils/registrationValidationService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ReferenceInfo extends Component {
	state = {
		referenceName: '',
		contactDetails: '',
		relationship: '',
		errors: {
			referenceNameError: false,
			contactDetailsError: false,
			relationshipError: false
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

	validateAndSendData = (e) => {
		e.preventDefault();

		const { referenceName, contactDetails, relationship } = this.state;

		const errorData = validateReferenceData( { referenceName, contactDetails, relationship } );

		const { errors, errorMessage } = errorData;

		this.setState( {
			errors,
			errorMessage
		} );

		const isNoError = Object.keys( errors ).every( error => !error );

		if ( isNoError ) {

			this.props.handleNext( { referenceName, contactDetails, relationship } );
		}
	};

	render() {

		const { referenceNameError, contactDetailsError, relationshipError } = this.state.errors;

		return (
			<div className="mv-fieldset">
				<h3>Referinte</h3>
				<span className="mv-fieldset-subtitle">
					(Te rugam sa indici o persoana care sa poata oferi referinte despre tine)
				</span>
				<div className="mv-form-group input-container">
					<label htmlFor="referenceName">Nume:</label>
					{ referenceNameError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="referenceName"
						id="referenceName"
						type="text"
						className={ `login-input ${ referenceNameError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
						required
					/>
				</div>
				<div className="mv-form-group input-container">
					<label htmlFor="contactDetails">
						Date de contact ale persoanei care te-a recomanda
					</label>
					{ contactDetailsError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="contactDetails"
						id="contactDetails"
						type="text"
						className={ `login-input ${ contactDetailsError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
						required
					/>
				</div>
				<div className="mv-form-group input-container">
					<label htmlFor="relationship">
						Care este relatia dintre tine si persoana de mai sus?
					</label>
					{ relationshipError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="relationship"
						id="relationship"
						type="text"
						className={ `login-input ${ relationshipError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
						required
					/>
				</div>
				<div className="mv-form-group register-button-container">
					<p className="register-error-text">{this.state.errorMessage}</p>
					<button className="mv-btn mv-btn-secondary" onClick={ this.validateAndSendData }>Urmatorul Pas</button>
				</div>
			</div>
		)
	}
}