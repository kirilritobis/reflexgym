// Controller
const UserCtrl = require('../controllers/user.controller')()

/**
 * @api {post} /api/users/create Create New User
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiPermission userAdmin
 * @apiParam {String}  firstName      Firstname of the User.
 * @apiParam {String}  lastName       Lastname.
 * @apiParam {String}  email          Email.
 * @apiParam {String}  phone          Phone.
 * @apiParam {String}  country        Country.
 * @apiParam {Int}     role           Role.
 * @apiParam {String}  [jobTitle]     Optional jobTitle.
 * @apiParam {Array}   egtGroupMember egtGroupMembers.
 * @apiParam {Boolean} [isClient]     Is Client.
 * @apiParam {Array}   [casinos]      The unique _id of the locations.
 * @apiParam {Array}   [clients]      The unique _id of the clients.
 * @apiParam {Array}   [clientGroups] The unique _id of the client groups.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
 router.route('/create')
    .post(/*isAuth, apiPermissions, TrimRequest.body, createUserValidation,*/ UserCtrl.createUser)
