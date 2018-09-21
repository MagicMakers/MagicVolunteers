import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../assets/magiclogo.png";
import ResetPasswordForm from '../components/resetPasswordForm.react';

function ResetPasswordPage( ) {
	return (
		<div className="mv-auth-wrap">
			<Link to="/" className="mv-auth-logo">
				<img src={ headerLogo } alt="" />
			</Link>
			<div className="mv-auth">
				<ResetPasswordForm />
			</div>
		</div>
	);
}

export default ResetPasswordPage;
