const paginate = ( items, req, takeParam = 10, skipParam = 0 ) => {
    const take = parseInt( takeParam, 10 );
    const skip = parseInt( skipParam, 10 );

    const numberOfPages = Math.ceil( items.length / take );
    const currentPage = skip > items.length - take ? numberOfPages : Math.ceil( skip / take ) + 1;
    const results = items.slice( skip, +skip + take );

    // 23 => 3 pages, skip = 20, take = 10
    // 23 => skip = 15, take = 5 => 5 pages, currentpage = 4
    let fullUrl = `${ req.protocol }://${ req.get( "host" ) }${ req.originalUrl }`;
    if ( fullUrl.indexOf( "take" ) === -1 ) {
        fullUrl =
            fullUrl.indexOf( "?" ) === -1
                ? fullUrl.concat( `?take=${ take }` )
                : fullUrl.concat( `&take=${ take }` );
    }

    if ( fullUrl.indexOf( "skip" ) === -1 ) {
        fullUrl =
            fullUrl.indexOf( "?" ) === -1
                ? fullUrl.concat( `?skip=${ skip }` )
                : fullUrl.concat( `&skip=${ skip }` );
    }

    const prev = skip >= take ? fullUrl.replace( `skip=${ skip }`, `skip=${ skip - take }` ) : null;
    const next =
        skip < take * ( numberOfPages - 1 )
            ? fullUrl.replace( `skip=${ skip }`, `skip=${ skip + take }` )
            : null;

    return {
        pagination: {
            numberOfPages,
            currentPage,
            links: {
                self: fullUrl,
                prev,
                next,
            },
        },
        results,
    };
};

module.exports = { paginate };
