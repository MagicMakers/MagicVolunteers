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
    saveAndReturnID( box );
};

const updateBox = async ( req, res ) => {
    const { box } = req;
    const data = req.params;
    if ( box ) {
        res.preconditionFailed( "existing_box" );
        return;
    }
    box.update( data );
    saveAndReturnID( box );
};

const assignVolunteer = async ( req, res ) => {
    const { box } = req;
    const { volunteerId } = req.params;

    box.assignVolunteer( volunteerId );
    saveAndReturnID( box );
};

const changeStatus = async ( req, res ) => {
    const { box } = req;
    const { status } = req.body;

    box.changeStatus( status );
    saveAndReturnID( box );
};

async function saveAndReturnID( box ) {
    try {
        const savedBox = await boxesRepository.saveBox( box );

        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        next( err );
    }
}

module.exports = {
    get,
    createBox,
    updateBox,
    changeStatus,
    assignVolunteer,
};
