// const jwt = require('jsonwebtoken')
// // should be removed and put into envconfig
// require('dotenv').config()
// const AuthModel = require('../models/auth.model')()
// // const UserSettingsModel = require('../models/user.settings.model')()
// const logger = require('../utils/loggers/common.logger')
// const errorhandler = require('../helpers/errorHandler')()

// module.exports = function AuthController () {
//     // Auth routes
//     async function authLocal (req, res, next) {
//         try {
//             await AuthModel.authLocal(req.body, (err, result) => {
//                 if (err) {
//                     return errorhandler.sendError(err, req, res, err.status ? err : '')
//                 }
//                 // console.log('GGGGGGG', result.email)
//                 const user = req.body.email
                
//                 const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//                 res.send({ accessToken: accessToken, refreshToken: refreshToken })
//                 // res.send(false)
//             })
//         } catch (err) {
//             logger.error('%o', err)
//             // return errorhandler.sendError(err, req, res)
//             return err
//         }
//     }

//     return {
//         // initCheck,
//         authLocal,
//         // authTOTP,
//         // logout
//     }
// }
