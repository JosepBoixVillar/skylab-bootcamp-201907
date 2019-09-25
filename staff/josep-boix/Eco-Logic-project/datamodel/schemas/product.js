// product schema

const mongoose = require ('mongoose')
const { Schema } = mongoose

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})