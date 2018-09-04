const express         = require( 'express' );
const cors            = require('cors');
const bodyParser      = require( 'body-parser' );
const logger          = require( './utilities/logger' );
const helmet          = require( 'helmet' );
const config          = require( './config' );
const customResponses = require( './middlewares/customResponses' );

const app = express();
const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set( 'env', ENV );

require( './models/user' );
require( './models/box' );
// add all models that are used in the app. Use require as below:
// require( path to model )

app.use( cors() ); // enables cors on the server, less code than writing it yourself
app.use( bodyParser.json() );
app.use( customResponses );
app.use( helmet() );

require( './config/mongoose' )( app );
require( './config/routes' )( app );

app.use( '/doc', express.static( 'doc' ) );

app.use( ( req, res ) => {
    res.notFound();
} );

app.use( ( err, req, res, next ) => {
    logger.error( err.stack );
    next( err );
} );

// Don't remove next !!!!
// eslint-disable-next-line no-unused-vars
app.use( ( err, req, res, next ) => {
    // eslint-disable-line no-unused-vars
    res.status( 503 ).json( {
        success: false,
        error: 'server_error',
    } );
} );

app.listen( port );
