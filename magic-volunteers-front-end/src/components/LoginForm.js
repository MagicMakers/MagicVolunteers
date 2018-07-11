import React, { Component } from "react";
import { Link } from "react-router-dom";

import CredentialsUtils from "../utils/CredentialsUtils";
import "./LoginForm.css";

class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        keepSession: false
    };

    handleSubmit = evt => {
        evt.preventDefault();
        CredentialsUtils.logIn(
            this.state.username,
            this.state.password,
            credentials => {
                const { keepSession } = this.state;
                let cookieDuration = keepSession === true ? 20 : 0;

                CredentialsUtils.storeCredentials(
                    credentials.userName,
                    credentials.token,
                    cookieDuration
                );

                // TODO show success messages
            },
            message => {
                // TODO show error messages
            }
        );
    };

    handleUsernameChange = evt => {
        this.setState({
            username: evt.target.value
        });
    };

    handlePasswordChange = evt => {
        this.setState({
            password: evt.target.value
        });
    };

    handleSessionChange = evt => {
        this.setState({
            keepSession: evt.target.checked
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Logare</h1>
                <div className="mv-form-group">
                    <label htmlFor="">Email</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                </div>
                <div className="mv-form-group">
                    <label htmlFor="">Parolă</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </div>
                <div className="mv-forgot-password">
                    <div className="mv-form-group mv-remember">
                        <input
                            id="keep-session-cb"
                            type="checkbox"
                            value={this.state.keepSession}
                            onChange={this.handleSessionChange}
                        />
                        <label htmlFor="keep-session-cb">Ține-mă minte</label>
                    </div>
                    <Link to="/password-recovery">Recuperare parolă</Link>
                </div>
                <button className="mv-btn mv-btn-primary">Sign in</button>

                <div className="mv-info-box">
                    <p>
                        Nu ai inca un cont?{" "}
                        <Link to="/register">Click aici</Link> pentru
                        inregistrare.
                    </p>
                </div>
            </form>
        );
    }
}

export default LoginForm;
