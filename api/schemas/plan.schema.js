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
    price: {
        type: Number,
        required: true
    },
    visits: {
        type: Number
    },
    name: {
        type: String,
        // required: true
    }
})
PlanSchema.plugin(autoIncrement, { model: 'Plan', field: 'uId' })
const SCHEMA = conn.model('plan', PlanSchema)
module.exports = SCHEMA
