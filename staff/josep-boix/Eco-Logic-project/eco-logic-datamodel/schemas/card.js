// card schema

const mongoose = require ('mongoose')
const { Schema } = mongoose

module.exports = new Schema ({
    identifier: {
        type: Number,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    ccv: {
        type: Number,
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