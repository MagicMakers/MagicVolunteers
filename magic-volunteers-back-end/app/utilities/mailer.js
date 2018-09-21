/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const jwt        = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const config     = require('../config');

const generateEmailBody = async ( user ) => {

	const { name, email } = user;

	const url = await generateUrl( email );

	return	`
		<h1> Buna ${ name }, </h1>
		<p style="width: 400px"> Pentru a reseta parola ta pentru contul ${ email }, te rugam sa accesezi acest <a href=${ url }>link</a></p>
		<p>Multumim, echipa Magic Camp</p>
	`
};

const generateToken = async ( email ) => {

	return jwt.sign(
		{ email },
		config.SECRET,
		{ expiresIn: '6h' }
	);
};

const generateUrl = async ( email ) => {

	const token = await generateToken( email );

	return `http://localhost:3000/reset-password/${ token }`;
};

const sendEmail = async ( user ) => {

	const { account, password } = config.email;
	const { email } = user;

	const message = await generateEmailBody( user );

	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: account,
			pass: password
		}
	});

	let mailOptions = {
		from: 'test@gmail.com',
		to: email,
		subject: 'Reset Password',
		html: message
	};

	return transporter.sendMail(mailOptions);
};


module.exports = {	sendEmail };