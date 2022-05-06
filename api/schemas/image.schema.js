const mongoose = require('mongoose')
const { conn } = require('../boot/mongo')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})
const SCHEMA = conn.model('image', ImageSchema)
module.exports = SCHEMA
