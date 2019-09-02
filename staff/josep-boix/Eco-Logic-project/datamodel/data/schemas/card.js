const mongoose = require ('mongoose')
const { Schema } = mongoose

const card = new Schema ({
    number: {
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
    }
})

module.exports = card