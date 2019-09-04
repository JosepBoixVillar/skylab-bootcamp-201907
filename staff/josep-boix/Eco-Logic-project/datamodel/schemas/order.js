const mongoose = require ('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

const orderSchema = new Schema ({
    id: {
        type: Number
    },
    date: {
        type: Date
    },

    buyer: [{ type: ObjectId, ref: 'User' }],

    items: {
        type: Array
    }
})
module.exports = orderSchema