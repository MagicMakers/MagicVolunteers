const env = process.env.NODE_ENV || "development";

const config = require( `./environments/${ env.toLowerCase() }` ); // eslint-disable-line import/no-dynamic-require
config.env = env;

module.exports = config;
