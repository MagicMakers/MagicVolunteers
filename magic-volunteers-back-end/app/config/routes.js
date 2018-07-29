const usersController = require( "../controllers/usersController" );
const boxesController = require( "../controllers/boxesController" );
const projectsController = require( "../controllers/projectsController" );

const checkBox = require( "../middlewares/checkBox" );
const authorize = require( "../middlewares/authorize" );

const express = require( "express" );

const router = express.Router();

/**
 *    @apiGroup User
 *    @api {post} /users/registration User registration
 *    @apiParam {String} email  Mandatory email.
 *    @apiParam {String} password  Mandatory password.
 *    @apiParam {String} name  Mandatory name.
 *    @apiParam {Date} dob  Mandatory date of birth.
 *    @apiParam {String} phone  Mandatory phone.
 *    @apiParam {Object} address  Mandatory address, consisting of city, county and other details.
 *    @apiParam {Object} background  Mandatory background, consisting of job experience, if (s)he has experience in working with children and details.
 *    @apiParam {Object} references  Mandatory reference, consisting of name, contact details and relationship.
 *    @apiParam {String} personalDrive  Mandatory reason why they want to join MagiCamp.
 *    @apiParam {Array} subscribedProjects  Mandatory subscribed projects. One of MagiCamp projects.
 *    @apiParam {String} role  Mandatory role: volunteer or coordinator.
 *    @apiParam {Boolean} isGDPRCompliant  Mandatory for now, false by default.
 *    @apiExample {request} Example request
 *    {
 *      "email": "email@emails.com",
 *      "password": "pass123",
 *      "name": "Ana Popescu",
 *      "dob": "1988-05-05",
 *      "phone": "0740123456",
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
 *        "email": "email@emails.com"
 *      }
 *   }
 */
router.post( "/api/users/registration", usersController.register );

/**
 *    @apiGroup User
 *    @api {post} /users/login User login
 *    @apiParam {String} email  User email required.
 *    @apiParam {String} password  User password required.
 *    @apiExample {request} Example request
 *    {
 *      "email": "user123",
 *      "password": "pass123"
 *    }
 *    @apiExample {response} Example response
 *       {
 *         "success": true,
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfa...."
 *      }
 */
router.post( "/api/users/login", usersController.login );

/**
 *    @apiGroup User
 *    @api {get} /users/getVolunteers Get volunteers
 *    @apiDescription Search by filtering options. Results are paginated
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
router.get( "/api/users/getVolunteers", usersController.getVolunteers );

/**
 *    @apiGroup User
 *    @api {put} /users/edit Edit the profile.
 *    @apiDescription Useful to change profile information
 *    @apiParam {String} id  User ID required.
 *    @apiParam {String} name  Mandatory name.
 */
router.put( "/api/users/edit", authorize, usersController.edit );

/**
 *    @apiGroup User
 *    @api {delete} /users/delete Delete user
 *    @apiParam {String} id  User ID required.
 *    @apiHeaderExample Example header
 *       {
 *           id:123456789
 *       }
 */
router.delete( "/api/users/delete", authorize, usersController.deleteUser );

/**
 *    @apiGroup Boxes
 *    @api {get} /boxes Get all boxes
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
router.get( "/api/boxes/", authorize, boxesController.get );

router.get( "/api/boxes/citiesList", authorize, boxesController.getCitiesList );

router.get( "/api/boxes/countiesList", authorize, boxesController.getCountiesList );
/**
 *    @apiGroup Boxes
 *    @api {post} /boxes Add a box
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
router.post( "/api/boxes", authorize, boxesController.createBox );

/**
 *    @apiGroup Boxes
 *    @api {put} /boxes/:id/assignVolunteer/:volunteerId Assing a volunteer to a box
 *    @apiParam {String} id  Mandatory box id string.
 *    @apiParam {String} id  Mandatory volunteer id.
 */
router.put(
    "/api/boxes/:id/assignVolunteer/:volunteerId",
    authorize,
    checkBox,
    boxesController.assignVolunteer,
);

/**
 *    @apiGroup Boxes
 *    @api {put} /boxes/:id/changeStatus Change the status of a box
 *    @apiParam {String} id  Mandatory box id string.
 *    @apiParam {String} status  Mandatory status string.
 *    Should be one of the following: "available", "assigned", "confirmed", "delivered"
 */
router.put( "/api/boxes/:id/changeStatus", authorize, checkBox, boxesController.changeStatus );

/**
 *    @apiGroup Boxes
 *    @api {put} /boxes/:id/update Change the status of a box
 *    @apiParam {String} id  Mandatory box id string.
 */
router.put( "/api/boxes/:id/update", authorize, checkBox, boxesController.updateBox );

/**
 *    @apiGroup Project
 *    @api {post} /projects/addAll Add all projects
 */
router.post( "/api/projects/addAll", authorize, projectsController.populateAll );

router.get( "/api/test", ( req, res ) => {
    res.json( { success: true } );
} );

module.exports = app => {
    app.use( "/", router );
};
