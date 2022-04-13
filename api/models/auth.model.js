const { Console } = require('winston/lib/winston/transports')
const passport = require('../boot/passport')

const UserSchema = require('../schemas/user.schema')

module.exports = function AuthModel () {
    // Auth routes
    async function authLocal (userData, callback) {
        // PassportJS is looking for `body` property in the first argument of `passport.authenticate`
            try {
                const userDataWrapper = {
                    body: userData
                }
                passport.authenticate('local', (err, user) => {
                    if (err) {
                        return callback(err)
                    }
                    callback(null, user)
                })(userDataWrapper)
            } catch (error) {
                throw error
            }
        }

    return {
        // initCheck,
        authLocal,
        // authTOTP,
        // logout
    }
}
