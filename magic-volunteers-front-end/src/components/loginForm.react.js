import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import CredentialsUtils from "../utils/CredentialsUtils";

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        keepSession: false,
    };

    handleSubmit = evt => {
        evt.preventDefault();
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

                this.props.history.replace( "/dashboard" );
            },
            err => {
                // TODO show error messages
                console.log( err );
            },
        );
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

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <h1>Logare</h1>
                <div className="mv-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={ this.state.email }
                        onChange={ this.handleEmailChange }
                    />
                </div>
                <div className="mv-form-group">
                    <label htmlFor="password">Parolă</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={ this.state.password }
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
                    <Link to="/password-recovery">Recuperare parolă</Link>
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
