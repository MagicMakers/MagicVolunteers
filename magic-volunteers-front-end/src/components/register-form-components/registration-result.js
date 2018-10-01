import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


export class RegistrationResult extends Component {

	constructor( props ) {
		super( props );
	}

	renderSuccess() {
		return (
			<div>
				<h3>Îți mulțumim pentru înregistrare!</h3>
				<p>Vei fi redirecționat imediat</p>
			</div>
		)
	}

	renderError( error ) {
		return (
			<div>
				<h3>A intervenit o eroare</h3>
				<p>Te rugam sa incerci din nou <span className="redo-link" onClick={() => this.props.onError(0)}>aici</span></p>
				<span className="mv-fieldset-subtitle mv-fieldset-error">
					({ error })
				</span>
			</div>
		)
	};

	render() {
		const { error } = this.props;

		return (
			<div className="mv-fieldset">
				{ error ? this.renderError(error) : this.renderSuccess() }
			</div>

		)
	}
}