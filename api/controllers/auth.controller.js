const { generateTokens } = require('../helpers/tokenGenerator')
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
            await AuthModel.authLocal(req.body, async (err, result) => {
                if (err) {
                    return errorhandler.sendError(err, req, res, err.status ? err : '')
                }
                const user = JSON.parse(JSON.stringify(result))
                const activated = !user.verifyAccountToken
                if (!activated) {
                    res.send({ activated: activated })
                    return
                }
                const { accessToken, refreshToken } = await generateTokens(user)
                res.cookie('jwt', refreshToken, { httpOnly: true } )
                res.send({ accessToken: accessToken, activated: activated })
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
