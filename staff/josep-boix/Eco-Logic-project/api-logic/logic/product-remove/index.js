const { models: { User } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Removes a product from the cart
 * 
 * @param {*} userId 
 * @param {*} productId 
 * 
 * @throws {Error} - if user id does not exist.
 * @throws {Error} - if item is not found.
 * 
 * @returns {Promise}
 */

module.exports = function(userId, productId) {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error('User not found')

        let item = user.cart.findIndex(item => { 
            debugger
            return item.product.toString() === productId
        })

        if(item > -1) await user.cart.splice(item, 1)
        if(item <0) throw Error(`Item with productId ${productId} not found.`)
        
        await user.save()
    })()
}