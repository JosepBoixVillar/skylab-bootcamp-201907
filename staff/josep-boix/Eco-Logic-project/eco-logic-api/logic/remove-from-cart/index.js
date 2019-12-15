const { models: { User } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Removes a product from the cart
 * 
 * @param {*} userId 
 * @param {*} productId 
 * 
 * @returns {Promise}
 */

function cartRemove(userId, productId) {

    validate.string(userId, 'User ID')
    validate.string(productId, 'Product ID')

    return( async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)

        let item = user.cart.findIndex(item => { 
            return item.product.toString() === productId            
        })

        if (item > -1) await user.cart.splice(item, 1)
        if (item < 0) throw Error(`Item with product id ${productId} not found`)
        
        await user.save()
    })()
}
module.exports = cartRemove