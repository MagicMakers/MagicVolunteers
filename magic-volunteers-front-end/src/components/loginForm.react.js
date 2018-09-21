import React, { Component } from "react";
import { setUserData }      from "../utils/adminService";
import { Link, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CredentialsUtils from "../utils/CredentialsUtils";

import "./loginForm.css";

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        keepSession: false,
		emailError: false,
		passwordError: false
    };

    handleSubmit = evt => {
        evt.preventDefault();
        this.clearLoginErrors();

        if ( !this.state.email ) {
        	this.handleLoginErrors('email');
		} else if ( !this.state.password ) {
        	this.handleLoginErrors('password')
		} else {
			CredentialsUtils.logIn(
				this.state.email,
				this.state.password,
				credentials => {
					const { keepSession } = this.state;
					const cookieDuration = keepSession === true ? 20 : 0;

					CredentialsUtils.storeCredentials(
						credentials.email,
						credentials.token,
						cookieDuration,
					);

					setUserData( credentials.user );
					this.props.history.replace( "/dashboard" );
				}, ( err ) => this.handleLoginErrors( err.errorType )
			);
		}
    };

    handleEmailChange = evt => {
        this.setState( {
            email: evt.target.value,
        } );
    };

    handlePasswordChange = evt => {
        this.setState( {
            password: evt.target.value,
        } );
    };

    handleSessionChange = evt => {
        this.setState( {
            keepSession: evt.target.checked,
        } );
    };

    handleLoginErrors = error => {
    	if ( error === 'email' ) {
			this.setState({
				emailError: true
			});
		} else {

			this.setState({
				passwordError: true
			});
		}
	};

    clearLoginErrors = () => {
    	this.setState({
			emailError: false,
			passwordError: false
		})
	};

    render() {

        return (
            <form onSubmit={ this.handleSubmit }>
                <h1>Logare</h1>
                <div className="mv-form-group input-container">
                    <label htmlFor="email">Email</label>
					{this.state.emailError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : ''}
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={ this.state.email }
						title={ this.state.emailError ? 'Email incorect sau inexistent' : '' }
						className={ `login-input ${this.state.emailError ? 'error-input' : ''}` }
                        onChange={ this.handleEmailChange }
                    />
                </div>
                <div className="mv-form-group input-container">
                    <label htmlFor="password">Parolă</label>
					{this.state.passwordError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : ''}
					<input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={ this.state.password }
						title={ this.state.passwordError ? 'Parola incorecta' : '' }
						className={ `login-input ${this.state.passwordError ? 'error-input' : ''}` }
						onChange={ this.handlePasswordChange }
                    />
                </div>
                <div className="mv-forgot-password">
                    <div className="mv-form-group mv-remember">
                        <input
                            id="keep-session-cb"
                            type="checkbox"
                            value={ this.state.keepSession }
                            onChange={ this.handleSessionChange }
                        />
                        <label htmlFor="keep-session-cb">Ține-mă minte</label>
                    </div>
                    <Link to="/forgot-password">Recuperare parolă</Link>
                </div>
                <button className="mv-btn mv-btn-primary">Sign in</button>

                <div className="mv-info-box">
                    <p>
                        Nu ai inca un cont? <Link to="/register">Click aici</Link> pentru
                        inregistrare.
                    </p>
                </div>
            </form>
        );
    }
}

export default withRouter( LoginForm );
