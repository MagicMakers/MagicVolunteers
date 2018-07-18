function setCookie( cname, cvalue, exdays ) {
    const d = new Date();
    const exdaysInMilliseconds = exdays * 24 * 60 * 60 * 1000;
    d.setTime( d.getTime() + exdaysInMilliseconds );
    const expires = `expires=${ d.toUTCString() }`;
    document.cookie = `${ cname }=${ cvalue };${ expires };path=/`;
}

function getCookie( cname ) {
    const name = `${ cname }=`;
    const ca = document.cookie.split( ";" );
    for ( let i = 0; i < ca.length; i + 1 ) {
        let c = ca[ i ];
        while ( c.charAt( 0 ) === " " ) {
            c = c.substring( 1 );
        }
        if ( c.indexOf( name ) === 0 ) {
            return c.substring( name.length, c.length );
        }
    }
    return "";
}

export default { setCookie, getCookie };
