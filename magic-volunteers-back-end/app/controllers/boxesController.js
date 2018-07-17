const { extractObject, removeUndefinedKeys } = require( "../utilities/index" );
const boxesRepository = require( "../repositories/boxesRepository" );

const get = async ( req, res, next ) => {
    const { assignedVolunteer, status, county } = req.query;
    try {
        const boxes = await boxesRepository.getByFilters( removeUndefinedKeys( {
            assignedVolunteer,
            status,
            county,
        } ) );

        res.success( boxes );
    } catch ( err ) {
        next( err );
    }
};

const getCitiesList = async ( req, res, next ) => {
    try {
        const cities = await boxesRepository.getCitiesList();
        res.success( cities );
    } catch ( err ) {
        next( err );
    }
};

const getCountiesList = async ( req, res, next ) => {
    try {
        const { boxStatus } = req.query;
        const counties = await boxesRepository.getCountiesList( boxStatus );
        res.success( counties );
    } catch ( err ) {
        next( err );
    }
};

const createBox = async ( req, res, next ) => {
    try {
        const { box } = req;
        if ( box ) {
            res.preconditionFailed( "existing_box" );
            return;
        }

        const savedBox = await boxesRepository.saveBox( box );
        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        next( err );
    }
};

const updateBox = async ( req, res, next ) => {
    try {
        const { box } = req;
        const data = req.params;
        if ( box ) {
            res.preconditionFailed( "existing_box" );
            return;
        }
        box.update( data );

        const savedBox = await boxesRepository.saveBox( box );
        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        next( err );
    }
};

const assignVolunteer = async ( req, res, next ) => {
    try {
        const { box } = req;
        const { volunteerId } = req.params;
        box.assignVolunteer( volunteerId );

        const savedBox = await boxesRepository.saveBox( box );
        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        next( err );
    }
};

const changeStatus = async ( req, res, next ) => {
    try {
        const { box } = req;
        const { status } = req.body;

        box.changeStatus( status );
        const savedBox = await boxesRepository.saveBox( box );
        res.success( extractObject( savedBox, [ "id" ] ) );
    } catch ( err ) {
        next( err );
    }
};

module.exports = {
    get,
    getCitiesList,
    getCountiesList,
    createBox,
    updateBox,
    changeStatus,
    assignVolunteer,
};
