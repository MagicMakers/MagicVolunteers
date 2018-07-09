import CredentialsUtils from "./CredentialsUtils";

const baseUrl = "https://api.magicvolunteers.tech/";

const addAuthHeader = ( initialHeadersObj = {} ) => {
    const token = CredentialsUtils.getCookie( "token" );
    return { ...initialHeadersObj, "x-access-token": token };
};

const getVolunteers = () => {
    const url = baseUrl.concat( "users/getVolunteers" );
    return fetch( url, addAuthHeader() ).then( resp => resp.json() );
};

const getBoxes = () => {
    const url = baseUrl.concat( "boxes/getAll" );
    return fetch( url, addAuthHeader() ).then( resp => resp.json() );
};

export { getBoxes, getVolunteers };
