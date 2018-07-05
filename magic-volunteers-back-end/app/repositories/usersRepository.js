const { paginate } = require( "../utilities/paginate" );

const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const getVolunteers = async req => {
    // const projection = {
    //     username: true,
    //     name: true,
    //     email: true,
    //     "address.city": true,
    //     "address.county": true,
    // };

    const { query } = req;
    const { take, skip } = query;
    if ( take ) {
        delete query.take;
    }
    if ( skip ) {
        delete query.skip;
    }

    query.role = "volunteer";

    const items = await User.find( query );
    return paginate( items, req, take, skip );
};

const findUser = async id => User.findOne( { id } );

const findUserByEmail = async email => User.findOne( { email } );

const findUserByUsername = async username => User.findOne( { username } );

const saveUser = async data => {
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

const deleteUser = async user => user.remove();

module.exports = {
    getVolunteers,
    findUser,
    findUserByEmail,
    findUserByUsername,
    saveUser,
    editUser,
    deleteUser,
};
