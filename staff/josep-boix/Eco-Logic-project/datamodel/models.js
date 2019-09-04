const mongoose = require ('mongoose')
const { userSchema, cardSchema, productSchema, itemSchema, orderSchema } = require ('./schemas')

const models = {
    User: mongoose.model ('User', userSchema),
    Card: mongoose.model ('Card', cardSchema),
    Product: mongoose.model ('Product', productSchema),
    Item: mongoose.model ('Item', itemSchema),
    Order: mongoose.model ('Order', orderSchema)
}
module.exports = models
//collections