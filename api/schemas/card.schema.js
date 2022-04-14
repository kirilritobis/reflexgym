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
CardSchema.plugin(autoIncrement, { model: 'Card', field: 'uId' })
const SCHEMA = conn.model('card', CardSchema)
module.exports = SCHEMA
