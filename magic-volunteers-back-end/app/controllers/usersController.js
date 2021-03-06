const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );
const usersRepository = require( "../repositories/usersRepository" );

const SECRET = "superSuperSecret";

const validateEmail = async ( req, res ) => {
    const { email } = req.body;
    const user = await usersRepository.findUserByEmail( email );

    if ( user ) {
        return res.status( 409 ).send( { message: "Email already exists" } );
    }

    res.json( {
        success: true,
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

        const token = jwt.sign( savedUser.toObject(), SECRET, { expiresIn: 1440 } );

        res.json( {
            success: true,
            payload: {
                token,
                user: { id: savedUser.id, email: savedUser.email },
            },
        } );
    } catch ( err ) {
        res.status( 400 ).send( err );
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

        const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
        return res.json( {
            success: true,
            token,
            user: {
                isCoordinator: user.isCoordinator,
                email,
                name: user.name,
            },
        } );
    }
    return res.status( 401 ).send( { msg: "Authentication failed. User not found.", errorType: "email" } );
};

const edit = async ( req, res ) => {
    const { body } = req;
    const user = await usersRepository.findUser( req.body.id );
    try {
        const editedUser = await usersRepository.editUser( user, body.data );
        res.success( editedUser );
    } catch ( err ) {
        res.send( err );
    }
};

const deleteUser = async ( req, res ) => {
    try {
        const user = await usersRepository.findUser( req.body.id );
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
    edit,
    deleteUser,
    getVolunteers,
};
