import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../assets/magiclogo.png";
import ForgotPasswordForm from '../components/forgotPasswordForm.react';

function ForgotPasswordPage( ) {
	return (
		<div className="mv-auth-wrap">
			<Link to="/" className="mv-auth-logo">
				<img src={ headerLogo } alt="" />
			</Link>
			<div className="mv-auth">
				<ForgotPasswordForm />
			</div>
		</div>
	);
}

export default ForgotPasswordPage;
