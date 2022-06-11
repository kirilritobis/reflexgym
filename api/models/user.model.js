const bcrypt = require('bcrypt')
const EmailUtils = require('../helpers/email.util')
const multer = require('multer')
const moment = require('moment')

const crypto = require('crypto')
const UserSchema = require('../schemas/user.schema')
const CardSchema = require('../schemas/card.schema')
const ImageSchema = require('../schemas/image.schema')
const PlanSchema = require('../schemas/plan.schema')

const {
    NotFound,
    Unauthorized,
    Forbidden
} = require('../helpers/error-handling')

module.exports = function UserModel () {
    async function createUser (userData, adminUser, session) {
        try {
            const randomToken = Math.floor(100000 + Math.random() * 900000)
            const q = {
                email: userData.email
            }
            const existingUser = await UserSchema.findOne(q)
            if (existingUser) {
                const err = new Forbidden('Account with the same Email Address already exists')
                err.type = 'email'
                err.datetime = new Date()
                throw err
            }

            const user = new UserSchema(userData)
            user.verifyAccountToken = randomToken
            user.verifyAccountExpires = Date.now() + 1.5 * 60 * 1000

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)

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

    async function findOneByEmail (email) {
        try {
            const query = {
                email
            }
            return await UserSchema.findOne(query)
        } catch (err) {
            throw err
        }
    }

    async function setupPassword (token) {
        try {
            const q = {
                verifyAccountToken: token
            }

            const user = await _findUser(q)

            user.verifyAccountToken = undefined
            user.verifyAccountExpires = undefined
            // if (user.status === userStatus.INACTIVE) {
            //     user.status = userStatus.ACTIVE
            // }
            const newUser = await user.save()

            const card = new CardSchema()
            if(!card){
                throw new Error('Ooops something went wrong')
            }
            card.user = newUser.uId
            await card.save()
            
            return { user, card }
        } catch (err) {
            throw err
        }
    }

    async function resetPassword (token, newPassword) {
        try {
            const q = {
                resetPasswordToken: token
            }

            const user = await _findUser(q)
            if (user.resetPasswordExpires < Date.now()) {
                throw new Unauthorized('Password reset token is invalid or has expired')
            }

            user.password = newPassword
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined

            // if (user.status === userStatus.INACTIVE) {
            //     user.status = userStatus.ACTIVE
            // }

            await user.save()
            // TODO PasswordReset
            return user
        } catch (err) {
            throw err
        }
    }

    async function _findUser (query) {
        try {
            const userFound = await UserSchema.findOne(query)
            if (!userFound) {
                throw new NotFound(`No user found matching: ${JSON.stringify(query)}`)
            }
            return userFound
        } catch (err) {
            throw err
        }
    }

    async function forgotPassword (email) {
        try {
            const user = await findUserByEmail(email)

            user.resetPasswordToken = await crypto.randomBytes(64).toString('hex')
            user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
            await user.save()
            await EmailUtils.sendEmail('resetPassword', user.email, {
                to: user.email,
                token: user.resetPasswordToken,
                // firstName: user.firstName,
                // lastName: user.lastName,
                uId: user.uId
            })
            // TODO PasswordReset

            return user
        } catch (err) {
            throw err
        }
    }

    async function findUserByEmail (email) {
        try {
            const userFound = await UserSchema.findOne({
                email: email
            })
            if (!userFound) {
                const error = {
                    message: 'The email address does not exist in the system',
                    status: 'invalidEmail'
                }
                throw (error)
            }
            return userFound
        } catch (err) {
            throw err
        }
    }

    async function resendConfirmationCode (userEmail) {
        try {
            const q = {
                email: userEmail
            }
            const existingUser = await UserSchema.findOne(q)
            if (!existingUser) {
                const err = new NotFound('User not found')
                err.type = 'email'
                err.datetime = new Date()
                throw err
            }
            const randomToken = Math.floor(100000 + Math.random() * 900000)
            existingUser.verifyAccountToken = randomToken
            existingUser.verifyAccountExpires = Date.now() + 1.5 * 60 * 1000
            await existingUser.save()
            const emailTemplate = 'welcomeAD'
            return await sendVerificationEmail(existingUser, emailTemplate)
        } catch (err) {
            throw err
        }
    }

    async function getUsers () {
        try {
            return await CardSchema.aggregate([{
                $match: {}
            },
            {
                $lookup:
                  {
                    from: 'users',
                    localField: 'user',
                    foreignField: 'uId',
                    as: 'userData'
                  }
             },
             {
                $unwind: {
                    path: '$userData',
                    // preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    email: '$userData.email',
                    phone: '$userData.phone',
                    uId: '$userData.uId',
                    lastADLoginStatus: '$userData.lastADLoginStatus',
                    firstName: '$userData.firstName',
                    lastName: '$userData.lastName',
                    cardNumber: '$uId'        
                }
            }
        ])
        } catch (err) {
            throw err
        }
    }

    async function getUserById (uId) {
        try {
            const q = {
                uId: uId
            }

            const user = await UserSchema.findOne(q)
            if(!user){
                throw new NotFound('User not found')
            }

            return user
        } catch (err) {
            throw err
        }
    }

    async function uploadFacePhoto (imageData, storage) {
        try {
              //upload parameters for multer
              const upload = multer({
                storage: storage,
              }).single('image');

              upload(req, res, function (err) {
                const newImage = new ImageSchema({
                    image: {
                        data: imageData,
                        contentType: 'image/png'
                    }
                })
    
                newImage.save()
                // Everything went fine.
              })

            return 'kur'
        } catch (err) {
            throw err
        }
    }

    async function createPlan (data) {
        try {
            const { price, startDate, months, visits } = data
            // const expiresOn = new Date(moment(startDate).add(months, 'months').calendar())
            const expiresOn = new Date(moment(startDate).add(months, 'months').endOf('day').toDate())
            const obj = {
                price,
                startDate,
                months,
                expiresOn,
                visits
            }
            const plan = await new PlanSchema(obj)
            return await plan.save()
        } catch (err) {
            throw err
        }
    }

    return {
        createUser,
        findOneByEmail,
        resetPassword,
        forgotPassword,
        setupPassword,
        resendConfirmationCode,
        getUsers,
        getUserById,
        uploadFacePhoto,
        createPlan
    }
}
