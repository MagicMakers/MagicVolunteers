const { extractObject, removeUndefinedKeys } = require( "../utilities/index" );
const boxesRepository = require( "../repositories/boxesRepository" );

const get = async ( req, res, next ) => {
    const { assignedVolunteer, status } = req.query;
    try {
        const boxes = await boxesRepository.getByFilters( removeUndefinedKeys( {
            assignedVolunteer,
            status,
        } ) );

        res.success( boxes );
    } catch ( err ) {
        next( err );
    }
};

const createBox = async ( req, res, next ) => {
    const { box } = req;
    if ( box ) {
        res.preconditionFailed( "existing_box" );
        return;
    }
    try {
        const savedBox = await boxesRepository.saveBox( req.body );

        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        next( err );
    }
};

module.exports = {
    get,
    createBox,
};
