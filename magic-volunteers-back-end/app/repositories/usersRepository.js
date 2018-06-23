const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const findUser = async ( id ) => User.findOne( { id } );

const findUserByEmail = async ( email ) => User.findOne( { email });

const findUserByUsername = async ( username ) => User.findOne( { username } );

const saveUser = async ( data ) => {
    const user = new User( data );

    user.setPass( data.password );
    return user.save();
};

const editUser = async ( userObject, newData ) => {
    const { name } = newData;
    const user = userObject;

    user.name = name;
   
    return user.save();
};

const deleteUser = async ( user ) => user.remove();

module.exports = {
    findUser,
    findUserByEmail,
    findUserByUsername,
    saveUser,
    editUser,
    deleteUser,
};
