const mongoose = require ('mongoose')
const { Schema } = mongoose

const productSchema = new Schema ({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: Image,
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
module.exports = productSchema