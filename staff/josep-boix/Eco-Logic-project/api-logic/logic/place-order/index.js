const validate = require('utils/validate')
const { models: { User, Order } } = require('datamodel')

/**
 * Place the order by user id
 * 
 * @param {*} userId 
 * 
 * @returns {Promise}
 */

function placeOrder(userId) {
    validate.string(userId, 'userId')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`User with id ${userId} does not exist`)

        const cart = user.cart
        if(cart.length === 0) throw new Error('Cart is empty')

        const date = new Date()

        const order = await Order.create({ date, customer: userId, items: user.cart })

        order.id = order._id.toString()
        delete order._id
        
        user.cart = []

        user.save()

        return order
    }) ()
}
module.exports = placeOrder