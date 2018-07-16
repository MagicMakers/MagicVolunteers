const mongoose = require( "mongoose" );

const Box = mongoose.model( "Box" );

module.exports = async ( req, res, next ) => {
    const { id } = req.params;
    if ( !id ) {
        res.preconditionFailed( "missing_box_id" );
        return;
    }

    req.box = await Box.findById( id );
    next();
};
