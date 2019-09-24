const { models: { User, Order } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Retrieves all orders to a registered user
 * 
 * @param {*} userId 
 * 
 * @returns {Promise}
 */

function retrieveAllOrders(userId) {
    validate.string(userId, 'User ID')

     return( async () => {
        const user = await User.findById(userId)
        if (!user) throw Error('User does not exist')
        
        if(user) {
            const orders = await Order.find({ __v: 0 }).populate('owner').populate('items.product').sort({ _id: 1 }).lean()
            if(!orders) throw Error('No orders available')

            orders.forEach(items => {
                items.id = items._id.toString()
                delete items._id         
            })
            return orders

        } else {
            throw Error('You have to login to see all the orders')
        }
    })() 
}
module.exports = retrieveAllOrders