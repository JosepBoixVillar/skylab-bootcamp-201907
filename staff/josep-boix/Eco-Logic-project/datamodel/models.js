//collections

const mongoose = require ('mongoose')
const { userSchema, cardSchema, productSchema,
        itemSchema, orderSchema, cartSchema } = require ('./schemas')

module.exports = {
    User: mongoose.model ('User', userSchema),
    Card: mongoose.model ('Card', cardSchema),
    Product: mongoose.model ('Product', productSchema),
    Item: mongoose.model ('Item', itemSchema),
    Order: mongoose.model ('Order', orderSchema),
    Cart: mongoose.model ('Cart', cartSchema)
}