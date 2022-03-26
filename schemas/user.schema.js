const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { conn } = require('../boot/mongo')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const Schema = mongoose.Schema

const userSchema = new Schema({
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
    phone: {
        type: mongoose.Schema.Types.String
        // required: true
    },
    password: {
        type: String
    }
})

// encrypt the password && 2FA secret and make it unreadable
userSchema.pre('save', async function () {
    try {
        const user = this

        // if (user.phone !== undefined) {
            // if you change this, please change as well in user.model.js > findOneByTelephone
        //     user.phone = user.phone.replace(/-/g, '').replace(/\s/g, '').replace('+', '00')
        // }

        // if (this.isModified('password') || this.isNew) {
        //     if (user.password !== undefined) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        //     }
        // }
    } catch (err) {
        logger.error(`Error on user.save.pre.hook: ${err}`)
    }
})

userSchema.plugin(autoIncrement, { model: 'User', field: 'uId' })

const SCHEMA = conn.model('user', userSchema)
module.exports = SCHEMA
