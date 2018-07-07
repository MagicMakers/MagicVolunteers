class CredentialsUtils {
    static setCookie( cname, cvalue, exdays ) {
        const d = new Date();
        let expires = "";
        // eslint-disable-next-line no-mixed-operators
        d.setTime( d.getTime() + exdays * 24 * 60 * 60 * 1000 );
        if ( exdays >= 0 ) {
            expires = `expires=${ d.toUTCString() }`;
        }
        document.cookie = `${ cname }=${ cvalue };${ expires };path=/`;
    }

    static getCookie( cname ) {
        const name = `${ cname }=`;
        const ca = document.cookie.split( ";" );
        for ( let i = 0; i < ca.length; i++ ) {
            let c = ca[ i ];
            while ( c.charAt( 0 ) === " " ) {
                c = c.substring( 1 );
            }
            if ( c.indexOf( name ) === 0 ) {
                return c.substring( name.length, c.length );
            }
        }
        return null;
    }

    static storeCredentials( userName, token, duration ) {
        CredentialsUtils.setCookie( "username", userName, duration );
        CredentialsUtils.setCookie( "token", token, duration );
    }

    static areCredentialsStored() {
        const userName = CredentialsUtils.getCookie( "username" );
        const token = CredentialsUtils.getCookie( "token" );

        return userName !== null && token !== null;
    }

    static checkStoredCredentialsValid( onTrue, onFalse ) {
        const token = CredentialsUtils.getCookie( "token" );

        fetch( "https://api.magicvolunteers.tech/test", {
            headers: { "x-access-token": token },
        } )
            // eslint-disable-next-line func-names
            .then( function( response ) {
                if ( response.status === 200 ) {
                    onTrue();
                } else {
                    onFalse();
                }
            } )
            .catch( onFalse );
    }

    static logIn( userName, password, onSuccess, onError ) {
        fetch( "https://api.magicvolunteers.tech/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                username: userName,
                password,
            } ),
        } )
            .then( function toJsonResponse( response ) {
                return response.json();
            } )
            .then( function processResponse( response ) {
                if ( response.status === 200 ) {
                    onSuccess( {
                        userName,
                        token: response.token,
                    } );
                } else {
                    onError( "Nume / Parola gresite" );
                }
            } );
    }

    static register( user, onSuccess, onError ) {
        fetch( "https://api.magicvolunteers.tech/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { user } ),
        } )
            .then( function toJsonResponse( response ) {
                return response.json();
            } )
            .then( function processResponse( response ) {
                if ( response.status === 200 ) {
                    onSuccess( {
                        userName: response.username,
                        token: response.token,
                    } );
                } else {
                    onError( "Nume / Parola gresite" );
                }
            } );
    }
}

export default CredentialsUtils;
