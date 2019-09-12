// item schema

const mongoose = require ('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema ({
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    product: { 
        type: ObjectId, 
        ref: 'Product' 
    }
})