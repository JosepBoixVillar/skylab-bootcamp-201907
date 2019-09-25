//cart schema
const mongoose = require ('mongoose') 
const { Schema } = mongoose

const cartSchema = new Schema ({
    productId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
module.exports = cartSchema