import CredentialsUtils from "./CredentialsUtils";

// TODO: move to a config file
const baseUrl = "http://localhost:3030/api/";

const login = ( email, password ) => {
    const url = baseUrl.concat( "users/login" );
    return fetch( url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            email,
            password,
        } ),
    } ).then( resp => resp.json() );
};

const register = user => {
    const url = baseUrl.concat( "users/registration" );
    return fetch( url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( { user } ),
    } ).then( response => response.json() );
};

const addAuthHeader = ( initialHeadersObj = {} ) => {
    const token = CredentialsUtils.getCookie( "token" );
    if ( token ) {
        return { ...initialHeadersObj, "x-access-token": token };
    }
    return initialHeadersObj;
};

const getVolunteers = ( filters, paginationOption = "" ) => {
    let url = baseUrl.concat( `users/getVolunteers${ paginationOption }` );
    Object.entries( filters ).forEach( ( [ key, value ] ) => {
        url = url.concat( `?${ key }=${ value }` );
    } );
    return fetch( url, { headers: addAuthHeader() } ).then( resp => resp.json() );
};

const deleteVolunteers = volunteerId => {
    const url = baseUrl.concat( "users/delete" );
    return fetch(
        url,
        addAuthHeader( {
            method: "DELETE",
            id: volunteerId,
        } ),
    ).then( resp => resp.json() );
};

const getBoxes = ( take, skip, params ) => {
    console.log(params)
    const data = {};
    data.url = baseUrl.concat( `boxes?take=${ take }&skip=${ skip }` );
    if ( params ) {
        params.forEach( param => {
            console.log(param)
            data.url = data.url.concat( `&${ param.key }=${ param.value }` );
        } );
    }
    console.log(data.url);
    return fetch( data.url, { headers: addAuthHeader() } ).then( resp => resp.json() );
};

const getBoxesByStatus = status => {
    const url = baseUrl.concat( `boxes?status=${ status }` );
    return fetch( url, { headers: addAuthHeader() } ).then( resp => resp.json() );
};

const getBoxesByAssignedVolunteer = id => {
    const volunteerId = id || "me";

    const url = baseUrl.concat( `boxes?assignedVolunteer=${ volunteerId }` );
    return fetch( url, { headers: addAuthHeader() } ).then( resp => resp.json() );
};

const addBox = box => {
    const url = baseUrl.concat( "boxes" );
    return fetch( url, {
        method: "POST",
        body: JSON.stringify( { box } ),
        headers: addAuthHeader( {
            Accept: "application/json",
            "Content-Type": "application/json",
        } ),
    } );
};

const changeBoxStatus = ( id, status ) => {
    const url = baseUrl.concat( `boxes/${ id }/changeStatus` );
    return fetch( url, {
        method: "PUT",
        body: JSON.stringify( { status } ),
        headers: addAuthHeader( {
            Accept: "application/json",
            "Content-Type": "application/json",
        } ),
    } );
};

const assignBoxVolunteer = ( boxId, volunteerId ) => {
    const vId = volunteerId || "me";
    const url = baseUrl.concat( `boxes/${ boxId }/assignVolunteer/${ vId }` );
    return fetch( url, {
        method: "PUT",
        headers: addAuthHeader(),
    } );
};

const getCitiesList = () => {
    const url = baseUrl.concat( "boxes/citiesList" );
    return fetch( url, { headers: addAuthHeader() } ).then( response => response.json() );
};

const getCountiesListByStatus = status => {
    const url = baseUrl.concat( `boxes/countiesList?boxStatus=${ status }` );
    return fetch( url, { headers: addAuthHeader() } ).then( response => response.json() );
};

export {
    login,
    register,
    getVolunteers,
    deleteVolunteers,
    getBoxes,
    getBoxesByAssignedVolunteer,
    getBoxesByStatus,
    addBox,
    getCitiesList,
    getCountiesListByStatus,
    changeBoxStatus,
    assignBoxVolunteer,
};
