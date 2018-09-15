import React, { Component } from 'react';
import  { validateUserData } from '../../utils/registrationValidationService';

import CredentialsUtils from '../../utils/CredentialsUtils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class UserInfo extends Component {
	state = {
		email: '',
		password: '',
		retypedPassword: '',
		errors: {
			emailError: false,
			passwordError: false,
			retypedPasswordError: false
		},
		errorMessage: ''
	};

	constructor( props ) {
		super( props );
	}

	validateEmail = (email) => {

		CredentialsUtils.validateEmail(
			email,
			( ) => {
				this.handleNext();
			},
			err => {
				this.setState( (prevState) => {

					const errors = prevState.errors;
					errors.emailError = true;

					return {
						errors,
						errorMessage: err.message
					}
				} );
			},
		);
	};

	handleNext = () => {
		const { email, password } = this.state;

		this.props.handleNext( { email, password } );
	};

	handleChange = evt => {
		const { name, value } = evt.target;

		this.setState({
			[name]: value
		})
	};

	validateAndSendData = (e) => {
		e.preventDefault();

		const { email, password, retypedPassword } = this.state;

		const errorData = validateUserData( { email, password, retypedPassword } );

		const { errors, errorMessage } = errorData;
		this.setState( {
			errors,
			errorMessage
		} );

		const { emailError, passwordError, retypedPasswordError } = errors;

		if ( !emailError && !passwordError && !retypedPasswordError ) {

			this.validateEmail( email );
		}
	};

	render() {

		const { emailError, passwordError, retypedPasswordError } = this.state.errors;

		return (
			<div className="mv-fieldset">
				<h3>Email si parola</h3>
				<div className="mv-form-group input-container">
					<label htmlFor="email">Email</label>
					{ emailError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="email"
						id="email"
						type="email"
						className={ `login-input ${ emailError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>

				<div className="mv-form-group input-container">
					<span className="mv-fieldset-subtitle">
                        (Parola trebuie sa contina minim 8 caractere, o cifra si un caracter majuscul)
                    </span>
					<label htmlFor="password">Parola</label>
					{ passwordError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="password"
						id="password"
						type="password"
						className={ `login-input ${ passwordError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>

				<div className="mv-form-group input-container">
					<label htmlFor="retyped-password">Rescrie Parola</label>
					{ retypedPasswordError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="retypedPassword"
						id="retyped-password"
						type="password"
						className={ `login-input ${ retypedPasswordError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
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