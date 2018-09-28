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
    const user = userObject;
    const {
        name, email, phone, dob, address, background, isCoordinator, personalDrive, references,
    } = newData;
    const { city, county, details } = address;
    const { experienceDetails, jobExperience } = background;
    const { contactDetails, relationship } = references;
    const refName = references.name;

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.dob = dob;
    user.isCoordinator = isCoordinator;
    user.personalDrive = personalDrive;
    user.address.city = city;
    user.address.county = county;
    user.address.details = details;
    user.background.experienceDetails = experienceDetails;
    user.background.jobExperience = jobExperience;
    user.references.contactDetails = contactDetails;
    user.references.name = refName;
    user.references.relationship = relationship;
    user.updatedAt = new Date().toISOString();
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
