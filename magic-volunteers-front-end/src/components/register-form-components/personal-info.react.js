import React, { Component } from 'react';

import { validatePersonalData } from '../../utils/registrationValidationService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const counties = [
	'Alba',
	'Arad',
	'Arges',
	'Bacau',
	'Bihor',
	'Bistrita Nasaud',
	'Botosani',
	'Brasov',
	'Braila',
	'Bucuresti',
	'Buzau',
	'Caras Severin',
	'Calarasi',
	'Cluj',
	'Constanta',
	'Covasna',
	'Dambovita',
	'Dolj',
	'Galati',
	'Giurgiu',
	'Gorj',
	'Harghita',
	'Hunedoara',
	'Ialomita',
	'Iasi',
	'Ilfov',
	'Maramures',
	'Mehedinti',
	'Mures',
	'Neamt',
	'Olt',
	'Prahova',
	'Satu Mare',
	'Salaj',
	'Sibiu',
	'Suceava',
	'Teleorman',
	'Timis',
	'Tulcea',
	'Vaslui',
	'Valcea',
	'Vrancea'
];

export class PersonalInfo extends Component {
	state = {
		name: '',
		dob: '',
		phone: '',
		county: '',
		city: '',
		address: '',
		errors: {
			nameError: false,
			dobError: false,
			phoneError: false,
			countyError: false,
			cityError: false,
			addressError: false
		},
		errorMessage: ''
	};

	constructor(props) {
		super(props);
	}

	handleChange = evt => {
		const { name, value } = evt.target;

		this.setState({
			[name]: value
		})
	};

	validateAndSendData = (e) => {
		e.preventDefault();

		const { name, dob, phone, county, city, address } = this.state;

		const errorData = validatePersonalData( { name, dob, phone, county, city, address } );

		const { errors, errorMessage } = errorData;
		this.setState({
			errors,
			errorMessage
		});

		const isNoError = Object.keys( errors ).every( error => !error );

		if ( isNoError ) {
			this.props.handleNext( { name, dob, phone, county, city, address } );
		}
	};

	buildOptions() {
		const stateEmptyOptions = [ <option key={ 0 } value="">-- Judet --</option> ];

		const stateOptions = counties.map( ( county, index ) => <option key={ index + 1 } value={ county }> { county } </option>);

		return stateEmptyOptions.concat( stateOptions );
	}

	render() {

		const stateOptions = this.buildOptions();

		const { nameError, dobError, phoneError, countyError, cityError, addressError } = this.state.errors;

		return (
			<div className="mv-fieldset">
				<h3>Date personale</h3>

				<div className="mv-form-group input-container">
					<label htmlFor="name">Nume</label>
					{ nameError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="name"
						id="name"
						type="text"
						placeholder="Nume"
						className={ `login-input ${ nameError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>

				<div className="mv-form-group input-container">
					<label htmlFor="dob">Data nasterii</label>
					{ dobError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="dob"
						id="dob"
						type="date"
						className={ `login-input ${ dobError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>

				<div className="mv-form-group input-container">
					<label htmlFor="phone">Telefon mobil</label>
					{ phoneError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="phone"
						id="phone"
						type="text"
						className={ `login-input ${ phoneError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>

				<div className="mv-form-group input-container">
					<label htmlFor="county">Judet</label>
					{ countyError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<select
						name="county"
						id="county"
						className={ `login-input ${ countyError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					>
						{ stateOptions 	}
					</select>
				</div>

				<div className="mv-form-group input-container">
					<label htmlFor="city">Localitate</label>
					{ cityError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="city"
						id="city"
						type="text"
						className={ `login-input ${ cityError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>

				<div className="mv-form-group input-container">
					<label htmlFor="address">Adresa</label>
					{ addressError ? <FontAwesomeIcon className="error-icon" icon="exclamation-circle" /> : '' }
					<input
						name="address"
						id="address"
						type="text"
						className={ `login-input ${ addressError ? 'error-input' : '' }` }
						onChange={ this.handleChange }
					/>
				</div>
				<div className="mv-form-group register-button-container">
					<p className="register-error-text">{this.state.errorMessage}</p>
					<button className="mv-btn mv-btn-secondary" onClick={ this.validateAndSendData }>Urmatorul Pas</button>
				</div>
			</div>
		)
	}
}
