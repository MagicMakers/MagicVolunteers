const mongoose = require( "mongoose" );

const Box = mongoose.model( "Box" );

const getBoxes = async () => Box.find( {} );

const getBox = async ( id ) => Box.findOne( { id } );

const getBoxesWithStatus = async ( status ) => Box.find( { status } );

const saveBox = async data => {
    const box = new Box( data );

    return box.save();
};

module.exports = {
    getBoxes,
    saveBox,
};
