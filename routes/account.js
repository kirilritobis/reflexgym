const express = require('express')
const router = express.Router()
// const UserCtrl = require('../controllers/user.controller')()
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
router.route('/register')
.post(/*TrimRequest.body, loginValidation,*/ /*(req, res, next) => {
    try {
        console.log('KURRR')
        res.render('register.ejs')
    } catch (err) {
        res.send(err.message)
    }
},*/ AuthCtrl.authLocal)


module.exports = router
