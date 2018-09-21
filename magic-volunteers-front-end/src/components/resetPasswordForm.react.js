import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CredentialsUtils from "../utils/CredentialsUtils";

import "./forgotPasswordForm.css";

class ResetPasswordForm extends Component {
	state = {
		password: '',
		retypedPassword: '',
		errorMessage: '',
		successMessage: ''
	};

	constructor(props) {
		super(props);

		this.state.token = props.match.params.token
	}

	handleSubmit = evt => {
		evt.preventDefault();

		const validation = this.validatePassword();

		this.setState( {
			errorMessage: validation.message
		} );

		if ( !validation.isError ) {

			const { password, token } = this.state;

			CredentialsUtils.changePassword({
				password,
				token
			},
				response => {
					this.setState( {
						successMessage: 'Felicitari. vei fi redirectionat catre pagina de login'
					} );

					setTimeout(() => {
						this.props.history.replace( '/' );
					}, 3000);
				}, ( err )  => {
					this.setState( {
						errorMessage: err.msg
					} )
				}
			);
		}
	};


	validatePassword = ( ) => {

		const validation = {
			isError: false,
			message: ''
		};

		const { password, retypedPassword } = this.state;

		const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

		if ( !passwordValidator.test(password) ) {

			validation.isError = true ;
			validation.message = 'Parola nu este sucifent de sigură';

		} else if ( password !== retypedPassword ) {

			validation.isError = true ;
			validation.message = 'Parolele nu sunt la fel';

		}

		return validation;
	};

	handleChange = ( evt ) => {

		const { value, name } = evt.target;

		this.setState( {
			[name]: value
		} )
	};

	render() {

		const { errorMessage, successMessage } = this.state;

		return (
			<form onSubmit={ this.handleSubmit }>
				<h1>Resetare Parola</h1>
				<p>Te rugam sa introduci o noua paropla pentru contul tau.</p>
				<span className="mv-fieldset-subtitle">
					(Parola trebuie sa contina minim 8 caractere, o cifra si un caracter majuscul)
				</span>
				<div className="mv-form-group input-container">
					<label htmlFor="password">Parola</label>
					{this.state.errorMessage ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : ''}
					<input
						type="password"
						id="password"
						name="password"
						className={ `login-input ${ errorMessage ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>
				<div className="mv-form-group input-container">
					<label htmlFor="retyped-password">Rescrie parola</label>
					{this.state.errorMessage ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : ''}
					<input
						type="password"
						id="retyped-password"
						name="retypedPassword"
						className={ `login-input ${ errorMessage ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>
				<p className={`message-row ${errorMessage ? 'error-message' : 'success-message'}`}>{ errorMessage || successMessage }</p>
				<button className="mv-btn mv-btn-primary">reseteaza parola</button>
			</form>
		);
	}
}

export default withRouter( ResetPasswordForm );
