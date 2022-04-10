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

    /**
    * Initial setup of a user password
    *
    * @param {string} token Secret token
    * @param {string} password The password of the user
    * @returns {user}
    */
     async function setupPassword (req, res) {
        try {
            await UsersModel.setupPassword(req.body.token, req.body.password)
            res.send({
                status: 1,
                message: "You have successfully created your password for EGT's Control System.",
                title: 'Successful Registration!'
            })
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    /**
     * Reset password
     *
     * @param {string} token Secret token
     * @param {string} email The email of the user
     * @returns {object}
     */
     async function resetPassword (req, res) {
        try {
            await UsersModel.resetPassword(req.body.token, req.body.password)
            res.send({
                status: 1,
                message: 'Your password has been successfully changed.',
                title: 'SUCCESS'
            })
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res)
        }
    }

    /**
     * Recover Password
     *
     * @param {string} email The email of the user
     * @returns {user}
     */
     async function forgotPassword (req, res) {
        try {
            const result = await UsersModel.forgotPassword(req.body.email)
            res.send({
                message: 'You password reset request has been successfully submitted.',
                status: 1,
                title: 'SUCCESS'
            })
            return result
        } catch (err) {
            logger.error('%o', err)
            return errorhandler.sendError(err, req, res, err)
        }
    }

    return {
        createUser, 
        resetPassword,
        forgotPassword,
        setupPassword
    }
}
