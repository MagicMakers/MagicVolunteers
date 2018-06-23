const usersController = require( "../controllers/usersController" );
const projectsController = require("../controllers/projectsController");
// add other controllers that are used

const authorize = require( "../middlewares/authorize" );
// add other middlewares that are used

const express = require( "express" );

const router = express.Router( );

// Add routes below
// Example: router.post/get/put/ ..../delete ( path ), middlewares ( if any ), controllerFunction );

// use apiDoc to generate documentation for API routes
// Details on how to use on: http://apidocjs.com/

/**
*    @apiGroup User
*    @api {post} /users/registration Adding an user to the db.
*    @apiParam {String} username  Mandatory username.
*    @apiParam {String} password  Mandatory password.
*    @apiParam {String} name  Mandatory name.
*    @apiParam {Date} dob  Mandatory date of birth.
*    @apiParam {String} phone  Mandatory phone.
*    @apiParam {String} email  Mandatory email.
*    @apiParam {Object} address  Mandatory address, consisting of city, county and other details.
*    @apiParam {Object} background  Mandatory background, consisting of job experience, if (s)he has experience in working with children and details.
*    @apiParam {Object} references  Mandatory reference, consisting of name, contact details and relationship.
*    @apiParam {String} personalDrive  Mandatory reason why they want to join MagiCamp.
*    @apiParam {Array} subscribedProjects  Mandatory subscribed projects. One of MagiCamp projects.
*    @apiParam {String} role  Mandatory role: volunteer or coordinator.
*    @apiParam {Boolean} isGDPRCompliant  Mandatory for now, false by default.
*    @apiExample {request} Example request
*    {
*      "username": "user123",
*      "password": "pass123",
*      "name": "Ana Popescu",
*      "dob": "1988-05-05",
*      "phone": "0740123456",
*      "email": "email@emails.com",
*      "address": {
*        "city": "Cluj-Napoca",
*        "county": "Cluj",
*        "details": "b-dul Eroilor, nr. 1"
*      },
*      "background": {
*        "jobExperience": "Am lucrat ca asistent medical la pediatrie",
*        "hasExperience": true,
*        "experienceDetails": "alte detalii"
*      },
*      "references": {
*        "name": "Andrei Pop",
*        "contactDetails": "0744123456",
*        "relationship": "coleg de munca"
*      },
*      "personalDrive": "iubesc copiii",
*      "subscribedProjects": [],
*      "role": "volunteer",
*      "isGDPRCompliant": false
*    }
*    @apiExample {response} Example response
*    {
*      "success": true,
*      "payload": {
*        "id": "123456789",
*        "username": "user123"
*      }
*   }
*/
router.post( "/users/registration", usersController.register );

/**
*    @apiGroup User
*    @api {post} /users/login User login route.
*    @apiParam {String} username  User username required.
*    @apiParam {String} password  User password required.
*    @apiExample {request} Example request
*    {
*      "username": "user123",
*      "password": "pass123"
*    }
*    @apiExample {response} Example response
*       {
*         "success": true,
*          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfa...."
*      }
*/
router.post( "/users/login", usersController.login );

/**
*    @apiGroup User
*    @api {put} /users/edit Edit the profile and filtering options.
*    @apiDescription Useful to change profile information
*    @apiParam {String} id  User ID required.
*    @apiParam {String} name  Mandatory name.
*/
router.put( "/users/edit", authorize, usersController.edit );

/**
*    @apiGroup User
*    @api {delete} /users/delete Delete an user.
*    @apiParam {String} id  User ID required.
*    @apiHeaderExample Example header
*       {
*           id:123456789
*       }
*/
router.delete( "/users/delete", authorize, usersController.deleteUser );

/**
*    @apiGroup Project
*    @api {post} /projects/addAll Adds all projects.
*/
router.post( "/projects/addAll", authorize, projectsController.populateAll );

router.get( "/test", ( req, res ) => {
    res.json( { success: true } );
} );

module.exports = ( app ) => {
    app.use( "/", router );
};
