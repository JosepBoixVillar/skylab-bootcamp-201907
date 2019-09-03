const mongoose = require ('mongoose')
const { user, card, product, item, order } = require ('./schemas')

const models = {
    User: mongoose.model ('User', user),
    Card: mongoose.model ('Card', card),
    Product: mongoose.model ('Product', product),
    Item: mongoose.model ('Item', item),
    Order: mongoose.model ('Order', order)
}
module.exports = models
//collections