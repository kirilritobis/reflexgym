const mongoose = require('mongoose')
const { conn } = require('../boot/mongo')

const { autoIncrement } = require('mongoose-plugin-autoinc')

const Schema = mongoose.Schema

const PlanSchema = new Schema({
    uId: {
        type: Number
    },
    months: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    expiresOn: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    visits: {
        type: Number
    }
})
PlanSchema.plugin(autoIncrement, { model: 'Plan', field: 'uId' })
const SCHEMA = conn.model('plan', PlanSchema)
module.exports = SCHEMA
