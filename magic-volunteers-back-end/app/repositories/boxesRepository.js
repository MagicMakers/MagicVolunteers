const mongoose = require( "mongoose" );

const Box = mongoose.model( "Box" );

const getByFilters = filters => {
    const query = {};
    Object.entries( filters ).forEach( ( [ key, value ] ) => {
        if ( key === "status" ) {
            query.status = value;
        } else if ( key === "assignedVolunteer" ) {
            query.assignedVolunteer = mongoose.Types.ObjectId( value );
        } else if ( key === "county" ) {
            query[ "address.county" ] = value;
        }
    } );
    return Box.find( query );
};

const saveBox = data => {
    const box = new Box( data );

    return box.save();
};

const getCitiesList = () => Box.distinct( "address.city" );

const getCountiesList = boxStatus => {
    const query = {};
    if ( boxStatus ) {
        query.status = boxStatus;
    }
    return Box.distinct( "address.county", query );
};

module.exports = {
    getByFilters,
    saveBox,
    getCitiesList,
    getCountiesList,
};
