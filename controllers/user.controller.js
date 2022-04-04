// Models
const UsersModel = require('../models/user.model')()

// Logger and Error Handler
const logger = require('../utils/loggers/common.logger')
const errorhandler = require('../helpers/errorHandler')()

module.exports = function UserController () {
    /**
     * Create User
     *
     * @param {string} firstName The first name of the user
     * @param {string} lastName The last name of the user
     * @param {string} email The email of the user
     * @param {string} phone The phone of the user
     */
     async function createUser (req, res, next) {
        try {
            // const adminUser = req.user
            const newUser = {
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
            }
            console.log('>>>>>', newUser)
            await UsersModel.createUser(req.body/*, adminUser, req.session*/)
            res.send({
                status: 1,
                message: 'Successfull created user'
            })
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    return {
        createUser
    }
}
