const mongoose = require('mongoose')
const { conn } = require('../boot/mongo')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const Schema = mongoose.Schema

const CardSchema = new Schema({
    uId: {
        type: Number
    },
    email: {
        type: mongoose.Schema.Types.String
        // required: true
    },
    user: {
        type: Number,
        ref: 'user'
    },
    byVisits: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        // required: true,
        default: false
    },
    lastLoadedOn: {
        type: Date
    },
    expiresOn: {
        type: Date
    },
    createdOn: {
        type: Date,
        default: () => Date.now()
    },
    chargedOn: {
        type: Date
    },
    expiresOn: {
        type: Date
    },
    remainingVisits: {
        type: Number,
        default: 0
    }
})
CardSchema.plugin(autoIncrement, { model: 'Card', field: 'uId' })
const SCHEMA = conn.model('card', CardSchema)
module.exports = SCHEMA
