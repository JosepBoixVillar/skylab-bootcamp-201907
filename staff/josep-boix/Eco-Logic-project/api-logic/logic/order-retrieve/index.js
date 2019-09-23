const { models: { Product, User, Order, Item } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Retrieve an order
 * 
 * @param {*} userId 
 * @param {*} orderId 
 * 
 * @returns {Promise}
 */

function retrieveOrder(userId, orderId) {
    validate.string(userId, 'User ID')
    validate.string(orderId, 'Order ID')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        
        const order = await Order.find({ _id: orderId }, { __v: 0 }).lean()
        if(!order) throw new Error(`Order with id ${orderId} not exist`)
        
        order.forEach(items => {
            items.id = items._id.toString()
            delete items._id 
        })
        
        owner = order[0].owner

        if(owner.toString() === userId)  {
            return order
        } else {
            throw new Error(`Order owner do not corresponds with user id ${userId}`)
        }
    }) ()
}
module.exports = retrieveOrder