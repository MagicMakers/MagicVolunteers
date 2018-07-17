import React, { Component } from "react";
import LoginForm from "../components/loginForm.react";
import headerLogo from "../assets/magiclogo.png";
import { Link } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div className="mv-auth-wrap">
                <Link to="/" className="mv-auth-logo">
                    <img src={headerLogo} alt="" />
                </Link>
                <div className="mv-auth">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default HomePage;
