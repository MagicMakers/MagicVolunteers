import { login, register, validateEmail } from "./apiServices";

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
					user: response.user
                } );
            } else {
                onError( response );
            }
        } );
    }

    static register( user, onSuccess, onError ) {
        register( user ).then( response => {
            if ( response.success ) {
                onSuccess( {
                    data: response.payload,
                } );
            } else {
                onError( response );
            }
        } );
    }

    static validateEmail( email, onSuccess, onError) {
        validateEmail( email ).then( response => {
			if ( response.success ) {
				onSuccess( response );
			} else {
				onError( response );
			}
		} );
    }
}

export default CredentialsUtils;
