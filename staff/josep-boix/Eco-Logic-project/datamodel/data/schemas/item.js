const mongoose = require ('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

const itemSchema = new Schema ({
    quantity: {
        type: String
    },
    
    product: [{ type: ObjectId, ref: 'Product' }]
})
module.exports = itemSchema