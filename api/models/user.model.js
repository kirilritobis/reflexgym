const passport = require('../boot/passport')
const EmailUtils = require('../helpers/email.util')

const crypto = require('crypto')
const userSchema = require('../schemas/user.schema')

const {
    NotFound,
    Unauthorized,
    Forbidden
} = require('../helpers/error-handling')

module.exports = function UserModel () {
    async function createUser (userData, adminUser, session) {
        try {
            const randomToken = await crypto.randomBytes(64).toString('hex')
            const q = {
                email: userData.email
            }
            const existingUser = await userSchema.findOne(q)
            if (existingUser) {
                const err = new Forbidden('Account with the same Email Address already exists')
                err.type = 'email'
                err.datetime = new Date()
                throw err
            }

            const user = new userSchema(userData)
            user.verifyAccountToken = randomToken
            user.verifyAccountExpires = Date.now() + 15 * 60 * 1000
            // user.status = userStatus.INACTIVE
            // user.createdBy = adminUser._id

            // if (session && session.ldapEmailLookupCache && session.ldapEmailLookupCache[user.email]) {
            //     user.isLDAP = true
            //     user.status = 2 // since user is LDAP, we active him directly, no email link is sent
            //     user.password = undefined
            // }

            const createdUser = await user.save()
            if(!createdUser){
                throw new Error('Ooops something went wrong')
            }

            // const ownerId = adminUser._id

            // await ActivityLogUsersModel.saveLog(UserLogActions.Create, createdUser.uId, '', '', '', ownerId)

            // await UserSettingsModel.saveUserSettings({
            //     userId: user._id
            // })
            const emailTemplate = 'welcomeAD'
            await sendVerificationEmail(user, emailTemplate)
            const processResult = {
                message: `Account verification email sent to ${user.email}`,
                _id: user._id
            }

            return processResult
        } catch (err) {
            throw err
        }
    }

    async function sendVerificationEmail (user, template) {
        try {
            await EmailUtils.sendEmail(template, user.email, {
                to: user.email,
                token: user.verifyAccountToken,
                firstName: user.firstName,
                lastName: user.lastName,
                uId: user.uId
            })
            return user.email
        } catch (err) {
            throw err
        }
    }

    return {
        createUser
    }
}
