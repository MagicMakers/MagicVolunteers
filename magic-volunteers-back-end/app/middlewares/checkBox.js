const mongoose = require( "mongoose" );

const Box = mongoose.model( "Box" );

module.exports = ( req, res, next ) => {
    const { id } = req.params;
    if ( !id ) {
        res.preconditionFailed( "missing_box_id" );
        return;
    }

    Box.findOne(
        { id },
        ( err, form ) => {
            if ( err ) {
                return res.serverError( );
            }
            req.box = box;
            return next( );
        },
    );
};
