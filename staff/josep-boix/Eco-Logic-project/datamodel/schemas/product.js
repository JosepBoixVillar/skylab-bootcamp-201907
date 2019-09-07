// product schema

const mongoose = require ('mongoose')
const { Schema } = mongoose

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
})