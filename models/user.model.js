const passport = require('../boot/passport')

const userSchema = require('../schemas/user.schema')

module.exports = function UserModel () {
    // Auth routes
    async function findOneByEmail (email) {
        try {
            const q = {
                email: email
            }
            return await userSchema.findOne(q)
        } catch (error) {
            throw error
        }
    }

    return {
        findOneByEmail
    }
}
