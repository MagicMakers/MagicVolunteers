const { paginate } = require( "../utilities/paginate" );

const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const getVolunteers = async ( filters, req ) => {
    const { query } = req;
    const { take, skip } = query || {};
    console.log(take,skip)
    Object.entries( filters ).forEach( ( [ key, value ] ) => {
        if ( key === "name" ) {
            query.name = { $regex: value, $options: "i" };
        } else if ( key === "email" ) {
            query.email = value;
        } else if ( key === "lat" ) {
            query[ "address.lat" ] = value;
        } else if ( key === "lng" ) {
            query[ "address.lng" ] = value;
        } else if ( key === "role" ) {
            query.role = value;
        }
    } );
    query.role = "volunteer";
    const items = await User.find( query );
    return paginate( items, req, take, skip );
};

const findUser = async id => User.findOne( { id } );

const findUserByEmail = async email => User.findOne( { email } );

const saveUser = async data => {
    const user = new User( data.user );
    user.setPass( data.user.password );
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
    saveUser,
    editUser,
    deleteUser,
};
