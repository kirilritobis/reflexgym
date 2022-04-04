const express = require('express')
const jwt = require('jsonwebtoken')

const { authenticate } = require('passport/lib')
const router = express.Router()
const UserCtrl = require('../controllers/user.controller')()
const AuthCtrl = require('../controllers/auth.controller')()
// const UserSettingsCtrl = require('../controllers/user.settings.controller')()
// const isAuth = require('../middleware/is-auth.middleware')
// const TrimRequest = require('../middleware/trim-request')

// const { loginValidation, loginOtpValidation } = require('../validators/auth.validation')
// const { setupPasswordValidation, changePasswordValidation, resetPasswordValidation, editUserValidation, checkPasswordResetLinkValidation, checkPasswordSetupLinkValidation } = require('../validators/user.validation')

/**
 * @api {post} /api/account/login/  Login
 * @apiName Login
 * @apiGroup Account
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email          Email of the user.
 * @apiParam {String} password       Password.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
// router.route('/login')
//     .post(/*TrimRequest.body, loginValidation,*/ (req, res, next) => {
//         try {
//             req.body.ipV4 = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
//                 req.connection.remoteAddress ||
//                 req.socket.remoteAddress ||
//                 req.connection.socket.remoteAddress

//             next()
//         } catch (err) {
//             res.send(err.message)
//         }
//     }, AuthCtrl.authLocal)

    /**
 * @api {post} /api/account/login/  Login
 * @apiName Login
 * @apiGroup Account
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email          Email of the user.
 * @apiParam {String} password       Password.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
router.route('/login')
    .post(/*TrimRequest.body, loginValidation, (req, res, next) => {
         try {
             req.body.ipV4 = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
                 req.connection.remoteAddress ||
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress
 
             next()
         } catch (err) {
             res.send(err.message)
         }
     }, */AuthCtrl.authLocal)

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
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
 router.route('/create')
 .post(/*isAuth, apiPermissions, TrimRequest.body, createUserValidation,*/ UserCtrl.createUser)


router.route('/test')
    .get(authenticateToken, (req, res) => {
        res.send('Successful login')
    })

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403)
        }
        next()
    })

}
 
 

module.exports = router
