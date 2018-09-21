import React, { Component } from "react";
import { setUserData }      from "../utils/adminService";
import { Link, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CredentialsUtils from "../utils/CredentialsUtils";

import "./forgotPasswordForm.css";

class ForgotPasswordForm extends Component {
	state = {
		email: '',
		errorMessage: ''
	};

	handleSubmit = evt => {
		evt.preventDefault();

		const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		const { email } = this.state;

		if ( !emailValidator.test( email ) ) {
			this.setState( {
				errorMessage: 'Formatul emailului este invalid'
			} )
		} else {
			this.setState( {
				errorMessage: ''
			} );
			CredentialsUtils.recoverPassword(
				this.state.email,
				credentials => {

					this.props.history.replace("/");
				}, ( err )  => {
					this.setState( {
						errorMessage: err.msg
					} )
				}
			);
		}

	};


	handleEmailChange = ( evt ) => {

		const { value } = evt.target;


		this.setState( {
			email: value
		} )
	};

	render() {

		const { errorMessage } = this.state;

		return (
			<form onSubmit={ this.handleSubmit }>
				<h1>Recuperare Parola</h1>
				<p>Te rog sa introduci adresa de email aferenta contului. Dupa validarea acesteia veti primi un email cu instructiunii pentru resetarea parolei</p>
				<div className="mv-form-group input-container">
					<label htmlFor="email">Introduce-ti adresa de email</label>
					{this.state.errorMessage ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : ''}
					<input
						type="text"
						id="email"
						placeholder="Email"
						className={ `login-input ${ errorMessage ? 'error-input' : '' }` }
						onChange={ this.handleEmailChange }
					/>
				</div>
				<p className="error-message">{ errorMessage }</p>
				<button className="mv-btn mv-btn-primary">recupereaza parola</button>
			</form>
		);
	}
}

export default withRouter( ForgotPasswordForm );
