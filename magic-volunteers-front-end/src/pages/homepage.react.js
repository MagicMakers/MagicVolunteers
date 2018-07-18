import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/loginForm.react";
import headerLogo from "../assets/magiclogo.png";

function HomePage() {
    return (
        <div className="mv-auth-wrap">
            <Link to="/" className="mv-auth-logo">
                <img src={ headerLogo } alt="" />
            </Link>
            <div className="mv-auth">
                <LoginForm />
            </div>
        </div>
    );
}

export default HomePage;
