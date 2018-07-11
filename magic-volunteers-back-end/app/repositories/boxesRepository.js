const mongoose = require( "mongoose" );

const Box = mongoose.model( "Box" );

const getByFilters = async filters => {
    const query = {};
    Object.entries( filters ).forEach( ( [ key, value ] ) => {
        if ( key === "status" ) {
            query.status = value;
        } else if ( key === "assignedVolunteer" ) {
            query.assignedVolunteer = mongoose.Types.ObjectId( value );
        }
    } );
    return Box.find( query );
};

const getBox = async ( id ) => Box.findOne( { id } );

const getBoxesWithStatus = async ( status ) => Box.find( { status } );

const saveBox = async data => {
    const box = new Box( data );

    return box.save();
};

module.exports = {
    getByFilters,
    saveBox,
};
