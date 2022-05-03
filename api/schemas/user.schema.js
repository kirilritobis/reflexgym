const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { conn } = require('../boot/mongo')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    uId: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: mongoose.Schema.Types.String
        // required: true
    },
    verifyAccountToken: Number,
    verifyAccountExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastADLoginStatus: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phone: {
        type: mongoose.Schema.Types.String
        // required: true
    },
    password: {
        type: String
    }
})

// encrypt the password && 2FA secret and make it unreadable
// UserSchema.pre('save', async function () {
//     try {
//         const user = this

//         // if (user.phone !== undefined) {
//             // if you change this, please change as well in user.model.js > findOneByTelephone
//         //     user.phone = user.phone.replace(/-/g, '').replace(/\s/g, '').replace('+', '00')
//         // }

//         // if (this.isModified('password') || this.isNew) {
//         //     if (user.password !== undefined) {
//             const salt = await bcrypt.genSalt(10)
//             user.password = await bcrypt.hash(user.password, salt)
//         //     }
//         // }
//     } catch (err) {
//         logger.error(`Error on user.save.pre.hook: ${err}`)
//     }
// })

UserSchema.plugin(autoIncrement, { model: 'User', field: 'uId' })

// method which can be used in the whole application where
// we want to compare two password (e.g. compare old and new passwords or
// compare if the incoming password from the front-end is correct and the
// user can be successfully authenticated)
UserSchema.methods.comparePassword = async function (candidatePassword, cb) {
    try {
        if (!candidatePassword || !this.password) {
            return false
        }
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        console.log(error)
        return error
    }
}

const SCHEMA = conn.model('user', UserSchema)
module.exports = SCHEMA
