const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../models/user.model')()

const logger = require('../utils/loggers/common.logger')

const noUser = function (done) {
    logger.error('No user by the email')
    const error = {}
    error.message = `<div>Sorry, your email address and/or password are incorrect. Please try again and if the issue still persists <a className={classes.linkPink} href="mailto:${process.env.MAIL_DEV}?subject=Login issue&body=   [Please describe here the issue you are facing.]">contact</a> the Control System team for further investigation.</div>`
    error.status = 'incorrectLogin'
    error.title = ''
    return done(error)
}

const userInternalChecks = async function (user, req, email, password, done) {   
        try {
            const match = await user.comparePassword(password)
            userPasswordChecks(match, user, req, email, password, done)
        } catch (err) {
            logger.error(`Error on comparing passwords:
            Error name: ${err.name}, error arguments: ${err.arguments}, error type: ${err.type},\nerror msg: ${err.message},\nerror stack:${err.stack}`)
            userPasswordChecks(false, user, req, email, password, done)
        }
    
}
const userPasswordChecks = async function (match, user, req, email, password, done, isLocked) {
    const errMessage = {}
    if (!match) {
        user.lastADLoginStatus = 'Failed: Not a matching password'
        await user.save()
        logger.error('Not a matching password')
        errMessage.message = `<div>Sorry, your email address and/or password are incorrect</div>`
        errMessage.status = 'incorrectLogin'
        errMessage.title = ''
        errMessage.httpStatusCode = 400
        return done(errMessage)
    }
    // Update user object in db
    // user.lastADLoginStatus = 'Success'
    // await user.save()

    // Hidding hash for the UI
    user.password = undefined
    return done(null, user)
}

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
async function (req, email, password, done) {
    try {
        let user = await UserModel.findOneByEmail(email)
        if (!user) {
            return noUser(done)
        }
        return userInternalChecks(user, req, email, password, done)
    } catch (err) {
        done(err)
    }
}
))

// Could be async if we wanted it to
passport.serializeUser(async (user, done) => {
    try {
        done(null, user.email)
    } catch (err) {
        return done(new Error(err.message))
    }
})

// ASYNC ALL THE THINGS!!
passport.deserializeUser(async (email, done) => {
    try {
        const user = await UserModel.findOneByEmail(email)
        if (!user) {
            return done(new Error('user not found'))
        }
        done(null, user)
    } catch (e) {
        done(e)
    }
})

module.exports = passport
