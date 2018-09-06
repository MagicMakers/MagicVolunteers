const express = require( "express" );
const bodyParser = require( "body-parser" );
const logger = require( "./utilities/logger" );
const helmet = require( "helmet" );
const config = require( "./config" );
const cookieParser = require('cookie-parser');
const customResponses = require( "./middlewares/customResponses" );

const app = express();
const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set( "env", ENV );

require( "./models/user" );
require( "./models/box" );
// add all models that are used in the app. Use require as below:
// require( path to model )
app.use(cookieParser());
app.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token",
    );
    res.header( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS" );
    next();
} );

app.use( bodyParser.json() );
app.use( customResponses );
app.use( helmet() );

require( "./config/mongoose" )( app );
require( "./config/routes" )( app );

app.use( "/doc", express.static( "doc" ) );

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
        error: "server_error",
    } );
} );

app.listen( port );
