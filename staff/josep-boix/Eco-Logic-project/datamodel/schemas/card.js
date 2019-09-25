// card schema

const mongoose = require ('mongoose')
const { Schema } = mongoose

const cardSchema = new Schema ({
    identifier: {
        type: Number,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    ccv: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        uppercase: true,
        enum: ['EUR', 'USD', 'LIB'],
        default:'EUR'
    }
})
module.exports = cardSchema