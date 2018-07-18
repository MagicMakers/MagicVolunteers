import React, { Component } from "react";
import RegisterForm from "../components/registerForm.react";
import headerLogo from "../assets/magiclogo.png";
import { Link } from "react-router-dom";

function RegisterPage() {
    return (
        <div className="mv-auth-wrap">
            <Link to="/" className="mv-auth-logo">
                <img src={ headerLogo } alt="" />
            </Link>
            <div className="mv-auth">
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;
