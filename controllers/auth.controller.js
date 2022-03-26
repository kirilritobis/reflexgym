const AuthModel = require('../models/auth.model')()
// const UserSettingsModel = require('../models/user.settings.model')()
// const logger = require('../utils/loggers/common.logger')
// const errorhandler = require('../helpers/errorHandler')()

module.exports = function AuthController () {
    // Auth routes
    async function authLocal (req, res, next) {
        try {
            // console.log("KURRRRR")
            // console.log(req.body)
            const result = await AuthModel.auth(req.body)
            console.log(result)
            res.send('ok')
        } catch (err) {
            // logger.error('%o', err)
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
