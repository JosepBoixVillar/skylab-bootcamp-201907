// order schema

const mongoose = require ('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose
const itemSchema = require ('./item')

const orderSchema = new Schema ({
    date: {
        type: Date
    },
    customer: { 
        type: ObjectId, 
        ref: 'User' 
    },
    items: [itemSchema]
})
module.exports = orderSchema