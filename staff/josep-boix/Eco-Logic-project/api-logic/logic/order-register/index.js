const { models: { User, Order } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Place the order
 * 
 * @param {*} userId 
 * 
 * @returns {Promise}
 */

function registerOrder(userId) {
    validate.string(userId, 'userId')

    return (async () => {
        const user = await User.findById(userId)

        if(!user) throw Error(`User with id ${userId} does not exist`)

        const cart=user.cart

        if(cart.length === 0) throw new Error('Cart is empty')

        const date=new Date()

        const order=await Order.create({ date, owner:userId, items:user.cart })
        
        user.cart = undefined

        user.save()

        return order
    }) ()
}
module.exports = registerOrder