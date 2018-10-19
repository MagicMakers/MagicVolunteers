import CredentialsUtils from "./CredentialsUtils";

// TODO: move to a config file
const baseUrl = "https://magicvolunteers.tech/api/";

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

const validateEmail = email => {
    const url = baseUrl.concat( "users/validation/email" );

    return fetch( url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( { email } ),
    } ).then( response => response.json() );
};

const logout = () => {
    const cookies = document.cookie.split( ";" );

    for ( let i = 0; i < cookies.length; i++ ) {
        const cookie = cookies[ i ];
        const eqPos = cookie.indexOf( "=" );
        const name = eqPos > -1 ? cookie.substr( 0, eqPos ) : cookie;
        document.cookie = `${ name }=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

const addAuthHeader = ( initialHeadersObj = {} ) => {
    const token = CredentialsUtils.getCookie( "token" );
    if ( token ) {
        return { ...initialHeadersObj, "x-access-token": token };
    }
    return initialHeadersObj;
};

const getVolunteers = ( paginationOption = "" ) => {
    const url = baseUrl.concat( `users/getVolunteers${ paginationOption }` );
    return fetch( url, { headers: addAuthHeader() } ).then( resp => resp.json() );
};

const deleteVolunteers = volunteerId => {
    const url = baseUrl.concat( "users/delete" );
    return fetch( url, {
        method: "DELETE",
        body: JSON.stringify( { id: volunteerId } ),
        headers: addAuthHeader( {
            Accept: "application/json",
            "Content-Type": "application/json",
        } ),
    } ).then( resp => resp.json() );
};

const editVolunteer = data => {
    const url = baseUrl.concat( "users/edit" );
    return fetch( url, {
        method: "PUT",
        body: JSON.stringify( { id: data.id, data } ),
        headers: addAuthHeader( {
            Accept: "application/json",
            "Content-Type": "application/json",
        } ),
    } ).then( resp => resp.json() );
};

const getBoxes = () => {
    const url = baseUrl.concat( "boxes" );
    return fetch( url, { headers: addAuthHeader() } ).then( resp => resp.json() );
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
    validateEmail,
    register,
    logout,
    getVolunteers,
    editVolunteer,
    deleteVolunteers,
    getBoxes,
    getBoxesByAssignedVolunteer,
    getBoxesByStatus,
    getCitiesList,
    getCountiesListByStatus,
    changeBoxStatus,
    assignBoxVolunteer,
};
