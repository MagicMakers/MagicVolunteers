import React, { Component } from "react";
import RegisterForm from "../components/RegisterForm.react";
import headerLogo from "../assets/magiclogo.png";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
    render() {
        return (
            <div className="mv-auth-wrap">
                <Link to="/" className="mv-auth-logo">
                    <img src={headerLogo} alt="" />
                </Link>
                <div className="mv-auth">
                    <RegisterForm />
                </div>
            </div>
        );
    }
}

export default RegisterPage;
