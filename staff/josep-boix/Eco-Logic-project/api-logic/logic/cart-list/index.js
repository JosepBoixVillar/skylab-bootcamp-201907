const { models: { User, Item } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Retrieve cart added products by an user
 * 
 * @param {*} userId 
 * 
 * @returns {Promise}
 */

function listToCart(userId) {
    validate.string(userId, 'User ID')

    return( async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        
        const { cart } = await User.findById(userId, { __v: 0 }).populate('cart.product').lean()

        return cart
    })()
}
module.exports = listToCart