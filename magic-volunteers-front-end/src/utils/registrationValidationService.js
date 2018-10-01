const validateUserData = (data) => {
	const errors = {
		emailError: false,
		passwordError: false,
		retypedPasswordError: false,
	};
	let errorMessage = '';

	const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
	const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const { email, password, retypedPassword } = data;

	if ( !email || !password || !retypedPassword ) {
		if ( !email ) {
			errors.emailError = true;
		}

		if ( !password ) {
			errors.passwordError = true;
		}

		if ( !retypedPassword ) {
			errors.retypedPasswordError = true;
		}

		errorMessage = 'Te rog completeaza toate campurile';

	} else if ( !emailValidator.test(email) ) {
		errors.emailError = true;

		errorMessage = 'Formatul emailului este invalid';

	} else if ( !passwordValidator.test(password) ) {
		errors.passwordError = true;

		errorMessage = 'Parola nu este sucifent de sigură';

	} else if ( password !== retypedPassword ) {
		errors.passwordError = true;
		errors.retypedPasswordError= true;

		errorMessage = 'Parolele nu sunt la fel';
	}

	return { errors, errorMessage }
};

const validatePersonalData = ( data ) => {
	const errors = {
		nameError: false,
		dobError: false,
		phoneError: false,
		countyError: false,
		cityError: false,
		addressError: false
	};

	let errorMessage = '';

	const phoneValidator = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;

	const nameValidator = /^[A-Za-z]+$/;

	const { name, dob, phone, county, city, address } = data;

	if ( !name || !dob || !phone || !county || !city || !address ) {
		if ( !name ) {
			errors.nameError = true;
		}

		if ( !dob ) {
			errors.dobError = true;
		}

		if ( !phone ) {
			errors.phoneError = true;
		}

		if ( !county ) {
			errors.countyError = true;
		}

		if ( !city ) {
			errors.cityError = true;
		}

		if ( !address ) {
			errors.addressError = true;
		}

		errorMessage = 'Te rog completeaza toate campurile';

	} else if ( !phoneValidator.test(phone) ) {
		errors.emailError = true;

		errorMessage = 'Numarul de telefon este invalid';

	} else if ( !nameValidator.test(name)) {
		errors.nameError = true;

		errorMessage = 'Numele nu pot contine numere sau caractere speciale'
	}

	return { errors, errorMessage }
};

const validateProfessionalData = ( data ) => {
	const errors = {
		hasError: false,
		experienceDetailsError: false,
	};

	let errorMessage = '';

	const { jobExperience, experienceDetails, hasExperience } = data;

	if ( !jobExperience || !experienceDetails || !hasExperience ) {

		errors.hasError = true;

		if ( !experienceDetails ) {
			errors.experienceDetailsError = true;
		}

		errorMessage = 'Te rog completeaza toate campurile';
	}

	return { errors, errorMessage }
};

const validateReferenceData = ( data ) => {
	console.log(data);
	const errors = {
		referenceNameError: false,
		contactDetailsError: false,
		relationshipError: false,
	};

	let errorMessage = '';

	const { referenceName, contactDetails, relationship } = data;

	if ( !referenceName || !contactDetails || !relationship ) {

		if ( !referenceName ) {
			errors.referenceNameError = true;
		}

		if ( !contactDetails ) {
			errors.contactDetailsError = true;
		}

		if ( !relationship ) {
			errors.relationshipError = true;
		}

		errorMessage = 'Te rog completeaza toate campurile';
	}

	return { errors, errorMessage }
};

const validateDriveData = ( data ) => {

 	const errors = {
		personalDriveError: false,
		projectsError: false,
	};

	let errorMessage = '';

	const { personalDrive, projects } = data;

	if ( !personalDrive ) {

		errors.personalDriveError = true;

		errorMessage = 'Te rog completeaza toate campurile';

	} else {
		const { proj1, proj2, proj3, proj4 } = projects;

		console.log(proj1, proj2, proj3, proj4);
		if ( proj1 || proj2 || proj3 || proj4 ) {

		} else {
			errors.projectsError = true;

			errorMessage = 'Trebuie selectat macar un proiect';
		}
	}

	return { errors, errorMessage }
};

const formatRegistrationError = ( error ) => {
	const errorMapper = {
		name: 'nameError',
		email: 'emailError',
		password: 'passwordError',
		dob: 'dobError',
		phone: 'phoneError',
		'address.city': 'cityError',
		'address.county': 'countyError',
		'address.details': 'addressError',
		'background.hasExperience': 'hasExperienceError',
		'background.jobExperience': 'jobExperienceError',
		'background.experienceDetails': 'experienceDetailsError',
		'references.name': 'referenceNameError',
		'references.contactDetails': 'contactDetailsError',
		'references.relationship': 'relationshipError',
		personalDrive: 'personalDriveError',
		subscribedProjects: 'subscribedProjectsError',
	};

	const parsedErrors = { };
	 Object.keys(error.errors).forEach( error => {
	 	parsedErrors[errorMapper[error]] = true;
	 } );

	return parsedErrors;
};

export { validateUserData, validatePersonalData, validateProfessionalData, validateReferenceData, validateDriveData, formatRegistrationError };