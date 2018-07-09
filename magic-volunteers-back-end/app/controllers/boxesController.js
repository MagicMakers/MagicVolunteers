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
        res.send( err );
    }
}

module.exports = {
    getAll,
    createBox,
};
