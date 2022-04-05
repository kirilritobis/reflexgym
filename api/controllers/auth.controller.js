const jwt = require('jsonwebtoken')
// should be removed and put into envconfig
require('dotenv').config()
const AuthModel = require('../models/auth.model')()
// const UserSettingsModel = require('../models/user.settings.model')()
const logger = require('../utils/loggers/common.logger')
const errorhandler = require('../helpers/errorHandler')()

module.exports = function AuthController () {
    // Auth routes
    async function authLocal (req, res, next) {
        try {
            await AuthModel.authLocal(req.body, (err, result) => {
                if (err) {
                    return errorhandler.sendError(err, req, res, err.status ? err : '')
                }
                const user = req.body.email

                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign( { email: user.email }, process.env.REFRESH_TOKEN_SECRET )
                res.cookie('jwt', refreshToken, { httpOnly: true } )
                // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                res.send({ accessToken: accessToken })
                // res.send(false)
            })
        } catch (err) {
            logger.error('%o', err)
            // return errorhandler.sendError(err, req, res)
            return err
        }
    }

    function generateAccessToken(user){
        try {
            return jwt.sign( { email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s'})
        } catch (err) {
            logger.error('%o', err)
            // return errorhandler.sendError(err, req, res)
            return err
        }
    }

    return {
        // initCheck,
        authLocal,
        // authTOTP,
        // logout
    }
}
