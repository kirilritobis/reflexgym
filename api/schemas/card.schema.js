const mongoose = require('mongoose')
const { conn } = require('../boot/mongo')

const Schema = mongoose.Schema

const CardSchema = new Schema({
    uId: {
        type: Number,
        ref: 'user'
    },
    email: {
        type: mongoose.Schema.Types.String
        // required: true
    },
    isActive: {
        type: Boolean,
        // required: true,
        default: false
    },
    lastLoadedOn: {
        type: Date
    },
    validUntil: {
        type: Date
    },
    createdOn: {
        type: Date,
        default: () => Date.now()
    }
})

const SCHEMA = conn.model('card', CardSchema)
module.exports = SCHEMA
