const mongoose = require ('mongoose')
const { Schema } = mongoose
const productSchema = require ('./product')

const item = new Schema ({
    quantity: {type: String},
    product: [productSchema]
})
module.exports = item