const { models: { User, Order } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Retrieve all orders from an user
 * 
 * @param {String} userId 
 * 
 * @returns {Promise}
 */

function listOrders(userId) {
    validate.string(userId, 'userId')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        
        const orders = await Order.find({ customer: userId }, { __v: 0 }).populate('items.product').sort({ _id: 1 }).lean()
        if(!orders) throw new Error(`There are no Orders`)

        orders.forEach(order => {
            order.id = order.items[0]._id.toString()
            // delete order._id
        })
        if(orders.length === 0) {
            throw new Error(`User with id ${userId} do not have any orders`)
        } else {
            return orders
        }
    }) ()
}
module.exports = listOrders