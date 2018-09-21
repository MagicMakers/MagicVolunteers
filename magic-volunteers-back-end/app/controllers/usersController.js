const jwt             = require( "jsonwebtoken" );
const bcrypt          = require( "bcrypt" );
const usersRepository = require( "../repositories/usersRepository" );

const mailer          = require('../utilities/mailer');
const tokenValidator  = require('../utilities/tokenValidator');

const config          = require('../config');

const validateEmail = async (req, res) => {
    const { email } = req.body;
    const user = await usersRepository.findUserByEmail( email );

    if(user) {
        return res.status(409).send({ message: 'Email already exists'})
    }

    res.json( {
      success: true
    } );
};


const register = async ( req, res ) => {
    const { user } = req;
    if ( user ) {
    	res.preconditionFailed( "existing_user" );
        return;
    }
    try {
        const savedUser = await usersRepository.saveUser( req.body );

        const token = jwt.sign( savedUser.toObject(), config.SECRET, { expiresIn: 1440 } );

        res.json( {
            success: true,
            payload: {
                token,
                user: { id: savedUser.id, email: savedUser.email },
            },
        } );
    } catch ( err ) {
        res.status(400).send( err );
    }
};

const login = async ( req, res ) => {
    const { email, password } = req.body;

    if ( !email ) {
		return res.status( 400 ).send( { msg: "email required", errorType: "email" } );
	}

    const user = await usersRepository.findUserByEmail( email );

    if ( !password ) {
		return res.status( 400 ).send( { msg: "password required", errorType: "password" } );
    }

    if ( user ) {
		const authenticated = bcrypt.compareSync( password, user.password );
        if ( !authenticated ) {
            return res.status( 401 ).send( { msg: "Authentication failed. Wrong password.", errorType: "password" } );
        }

        const token = jwt.sign( user.toObject(), config.SECRET, { expiresIn: 1440 } );
        return res.json( {
            success: true,
            token,
	    	user: {
	        	isCoordinator: user.isCoordinator,
				email: email,
				name: user.name
	   		}
        } );
    }
    return res.status( 401 ).send( { msg: "Authentication failed. User not found.", errorType: "email" } );
};

const recoverPassword = async ( req, res ) => {
	console.log('here')

	const { email } = req.body;

	if ( !email ) {
		return res.status( 400 ).send( { msg: "email required" } );
	}

	const user = await usersRepository.findUserByEmail( email );
	
	if ( !user ) {
        return res.status( 404 ).send( { msg: 'Adresa de email nu este inregistrata, te rog creeaza un cont nou.' } )
	}

	return mailer.sendEmail( user )
		.then( ( ) => res.status( 200 ).send( { success: true } ) )
		.catch( ( ) => res.status( 500 ).send( { msg: 'A intervenit o eroare te rugam sa incerci din nou mai tarziu.' } ));

};

const changePassword = async ( req, res ) => {

	const { password, token } = req.body;
	const decodedToken = await jwt.verify( token, config.SECRET );

	const isTokenValid = tokenValidator.verifyTokenExpiration( decodedToken );

	if ( !isTokenValid ) {
		return res.status( 410 ).send( { msg: "resource is no longer available, please try again" } );
	}

	const { email } = decodedToken;

	const user = await usersRepository.findUserByEmail( email );

	const savedUser = await usersRepository.editUserPassword( user, password );

	return res.status( 200 ).send( { success: true } );
};

const edit = async ( req, res ) => {
    const { user } = req;

    try {
        const editedUser = await usersRepository.editUser( user, req.body );
        res.success( editedUser );
    } catch ( err ) {
        res.send( err );
    }
};

const deleteUser = async ( req, res ) => {
    const { user } = req;

    try {
        const deletedUser = await usersRepository.deleteUser( user );
        res.success( deletedUser );
    } catch ( err ) {
        res.send( err );
    }
};

const getVolunteers = async ( req, res ) => {
    try {
        const users = await usersRepository.getVolunteers( req );
        res.success( users );
    } catch ( err ) {
        res.send( err );
    }
};

module.exports = {
    validateEmail,
    register,
    login,
    recoverPassword,
	changePassword,
    edit,
    deleteUser,
    getVolunteers
};
