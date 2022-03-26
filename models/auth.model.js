const userSchema = require('../schemas/user.schema')

module.exports = function AuthModel () {
    // Auth routes
    async function auth (data) {
        try {
            const new_obj = JSON.parse(JSON.stringify(data))
            const banica = await new userSchema(new_obj)
            return await banica.save()
        } catch (err) {
            // logger.error('%o', err)
            // return errorhandler.sendError(err, req, res)
            return err
        }
    }

    return {
        // initCheck,
        auth,
        // authTOTP,
        // logout
    }
}
