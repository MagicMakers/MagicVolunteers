const extractObject = require( "../utilities/index" );
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );
const usersRepository = require( "../repositories/usersRepository" );

const SECRET = "superSuperSecret";

const register = async ( req, res ) => {
    const { user } = req;
    if ( user ) {
        res.preconditionFailed( "existing_user" );
        return;
    }
    try {
        const savedUser = await usersRepository.saveUser( req.body );

        res.success( extractObject(
            savedUser,
            [ "id", "username" ],
        ) );
    } catch ( err ) {
        res.send( err );
    }
};

const login = async ( req, res ) => {
    const user = await usersRepository.findUserByUsername(req.body.username);

    if ( !req.body.password ) {
        return res.status( 400 ).send( "password required" );
    }

    if ( user ) {
        const password = bcrypt.compareSync( req.body.password, user.password );
        if ( !password ) {
            return res.status( 401 ).send("Authentication failed. Wrong password.");
        }

        const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
        return res.json( {
            success: true,
            token,
        } );
    }
    return res.status( 401 ).send("Authentication failed. User not found.");
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

module.exports = {
    register,
    login,
    edit,
    deleteUser,
};
