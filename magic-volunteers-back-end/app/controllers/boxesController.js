const extractObject = require( "../utilities/index" );
const boxesRepository = require( "../repositories/boxesRepository" );

const getAll = async ( req, res ) => {
    try {
        const boxes = await boxesRepository.getBoxes();

        res.success( boxes );
    } catch ( err ) {
        res.send( err );
    }
};

const createBox = async ( req, res ) => {
    const { box } = req;
    if ( box ) {
        res.preconditionFailed( "existing_box" );
        return;
    }
    try {
        const savedBox = await boxesRepository.saveBox( req.body );

        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        res.send( err );
    }
};

module.exports = {
    getAll,
    createBox,
};
