import { login, register } from "./apiServices";

class CredentialsUtils {
    static setCookie( cname, cvalue, exdays ) {
        const d = new Date();
        let expires = "";
        // eslint-disable-next-line no-mixed-operators
        d.setTime( d.getTime() + exdays * 24 * 60 * 60 * 1000 );
        if ( exdays >= 0 ) {
            expires = `expires=${ d.toUTCString() }`;
        }

        document.cookie = `${ cname }=${ cvalue }, ${ expires }, path=/`;
    }

    static getCookie( cname ) {
        const cookiesArray = document.cookie.split( "; " );

        const cookies = cookiesArray.reduce( ( acc, cookie ) => {
            if ( cookie ) {
                let [ key, value ] = cookie.split( "=" );
                [ value ] = value.split( "," ); // take expires and path into account
                acc[ key ] = value;
            }
            return acc;
        }, {} );

        return cookies[ cname ];
    }

    static storeCredentials( email, token, duration = 1 ) {
        CredentialsUtils.setCookie( "email", email, duration );
        CredentialsUtils.setCookie( "token", token, duration );
    }

    static logIn( email, password, onSuccess, onError ) {
        login( email, password ).then( function processResponse( response ) {
            if ( response.success ) {
                onSuccess( {
                    email,
                    token: response.token,
                } );
            } else {
                onError( "Nume / Parola gresite" );
            }
        } );
    }

    static register( user, onSuccess, onError ) {
        register( user ).then( response => {
            if ( response.status === 200 ) {
                onSuccess( {
                    email: response.email,
                    token: response.token,
                } );
            } else {
                onError( response );
            }
        } );
    }
}

export default CredentialsUtils;
