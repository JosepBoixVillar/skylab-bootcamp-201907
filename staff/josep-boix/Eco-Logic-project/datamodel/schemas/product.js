// product schema

const mongoose = require ('mongoose')
const { Schema } = mongoose

const productSchema = new Schema ({
    title: {
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
module.exports = productSchema 