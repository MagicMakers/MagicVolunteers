const extractObject = ( obj, keys ) => {
    const returnObj = {};
    keys.forEach( key => {
        returnObj[ key ] = obj[ key ];
    } );

    return returnObj;
};

const removeUndefinedKeys = obj => {
    const cleanedObject = obj;
    Object.keys( cleanedObject ).forEach( key => cleanedObject[ key ] === undefined && delete cleanedObject[ key ] );
    return cleanedObject;
};

module.exports = {
    extractObject,
    removeUndefinedKeys,
};
