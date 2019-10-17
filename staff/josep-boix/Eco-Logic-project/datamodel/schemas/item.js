// item schema

const mongoose = require ('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

const itemSchema = new Schema ({
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
module.exports = itemSchema