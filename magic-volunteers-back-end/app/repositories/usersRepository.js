const { paginate } = require( "../utilities/paginate" );

const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const getVolunteers = async req => {
    const { query } = req;
    const { take, skip } = query;

    const items = await User.find( { role: "volunteer" } );
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
