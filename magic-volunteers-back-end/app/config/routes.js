const usersController = require( "../controllers/usersController" );
const projectsController = require( "../controllers/projectsController" );
const boxesController = require( "../controllers/boxesController" );
// add other controllers that are used

const authorize = require( "../middlewares/authorize" );
// add other middlewares that are used

const express = require( "express" );

const router = express.Router();

// Add routes below
// Example: router.post/get/put/ ..../delete ( path ), middlewares ( if any ), controllerFunction );

// use apiDoc to generate documentation for API routes
// Details on how to use on: http://apidocjs.com/

/**
 *    @apiGroup User
 *    @api {post} /users/registration User registration
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
 *    @api {post} /users/login User login
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
 *    @api {get} /users/getVolunteers Get volunteers
 *    @apiDescription Search by filtering options. Results are paginated
 *    @apiParam {String} username  Optional query by username.
 *    @apiParam {String} email  Optional query by email.
 *    @apiParam {String} address.city  Optional query by city.
 *    @apiParam {String} address.county  Optional query by county.
 *    @apiExample {request} Example request
 *      GET /users/getVolunteers?address.city=Cluj-Napoca
 *    @apiExample {response} Example response
 *    {
 *      "success": true,
 *      "payload": {
 *      "pagination": {
 *          "numberOfPages": 1,
 *          "currentPage": 1,
 *          "links": {
 *              "self": "https://api.magicvolunteers.tecg/users/getVolunteers?address.city=Cluj-Napoca&take=10&skip=0",
 *              "prev": null,
 *              "next": null
 *          }
 *      },
 *      "results": [
 *          {
 *              "username": "user123",
 *              "name": "Ana Popescu",
 *              "dob": "1988-05-05T00:00:00.000Z",
 *              "phone": "0740123456",
 *              "email": "email@emails.com",
 *              "personalDrive": "iubesc copiii",
 *              "role": "volunteer",
 *              "isGDPRCompliant": false,
 *              "subscribedProjects": [],
 *              "references": {
 *                  "name": "Andrei Pop",
 *                  "contactDetails": "0744123456",
 *                  "relationship": "coleg de munca"
 *              },
 *              "background": {
 *                  "jobExperience": "Am lucrat ca asistent medical la pediatrie",
 *                  "hasExperience": true,
 *                  "experienceDetails": "alte detalii"
 *              },
 *              "address": {
 *                  "city": "Cluj-Napoca",
 *                  "county": "Cluj",
 *                  "details": "b-dul Eroilor, nr. 1"
 *              },
 *              "id": "5b3d2c8d718781f274e0b483"
 *          }
 *      ]
 *  }
 *}
 *
 */
router.get( "/users/getVolunteers", usersController.getVolunteers );

/**
 *    @apiGroup User
 *    @api {put} /users/edit Edit the profile.
 *    @apiDescription Useful to change profile information
 *    @apiParam {String} id  User ID required.
 *    @apiParam {String} name  Mandatory name.
 */
router.put( "/users/edit", authorize, usersController.edit );

/**
 *    @apiGroup User
 *    @api {delete} /users/delete Delete user
 *    @apiParam {String} id  User ID required.
 *    @apiHeaderExample Example header
 *       {
 *           id:123456789
 *       }
 */
router.delete( "/users/delete", authorize, usersController.deleteUser );

/**
 *    @apiGroup Boxes
 *    @api {get} /boxes/getAll Get all boxes
 *    @apiParam {String} status  Optional status of the MagicBox. One of: "available", "assigned", "confirmed", "delivered".
 *    @apiParam {String} assignedVolunteer  Optional id of assigned volunteer
 *    @apiExample {response} Example response
 *    {
 *      "success": true,
 *      "payload": [
 *        {
 *          "_id": "5b3bdb3823dbed005afd63bc",
 *          "updatedAt": "2018-07-03T20:23:20.490Z",
 *          "createdAt": "2018-07-03T20:23:20.490Z",
 *          "name": "Ana Ionescu",
 *          "details": "Familie cu 2 copii",
 *          "status": "available",
 *          "isActive": true,
 *          "__v": 0,
 *          "address": {
 *            "city": "Cluj-Napoca",
 *            "county": "Cluj",
 *            "details": "b-dul Eroilor, nr. 1"
 *          },
 *          "id": "5b3bdb3823dbed005afd63bb"
 *        }
 *      ]
 *    }
 */
router.get( "/boxes/", /* authorize, */ boxesController.get );

/**
 *    @apiGroup Boxes
 *    @api {post} /boxes/save Add a box
 *    @apiParam {Object} address  Mandatory address, consisting of city, county and other details.
 *    @apiParam {String} name  Mandatory name of the recipient.
 *    @apiParam {String} details  Mandatory details about the family or medical conditions.
 *    @apiParam {String} status  Mandatory status of the MagicBox. One of: "available", "assigned", "confirmed", "delivered".
 *    @apiParam {String} assignedVolunteer UserID of the assigned volunteer.
 *    @apiParam {Boolean} isActive Mandatory flag showing if the magic box is still needed to be sent monthly.
 *    @apiExample {request} Example request
 *    {
 *      "address": {
 *        "city": "Cluj-Napoca",
 *        "county": "Cluj",
 *        "details": "b-dul Eroilor, nr. 1"
 *      },
 *      "name": "Ana Ionescu",
 *      "details": "Familie cu 2 copii",
 *      "status": "available",
 *      "isActive": "volunteer"
 *    }
 *   @apiExample {response} Example response
 *    {
 *      "success": true,
 *      "payload": {
 *        "id": "5b3bdb3823dbed005afd63bb"
 *      }
 *   }
 */
router.post( "/boxes/save", /* authorize, */ boxesController.createBox );

/**
 *    @apiGroup Project
 *    @api {post} /projects/addAll Add all projects
 */
router.post( "/projects/addAll", authorize, projectsController.populateAll );

router.get( "/test", ( req, res ) => {
    res.json( { success: true } );
} );

module.exports = app => {
    app.use( "/", router );
};
