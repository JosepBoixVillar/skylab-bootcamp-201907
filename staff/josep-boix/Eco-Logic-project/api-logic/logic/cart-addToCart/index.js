const { models: { User, Item } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Add to the cart by user ID
 * 
 * @param {*} userId 
 * @param {*} productId 
 * @param {*} quantity 
 * 
 * @returns {Promise}
 */

function addToCart(userId, quantity, productId) {
    validate.string(userId, 'User ID')
    validate.string(quantity, 'Quantity')
    validate.string(productId, 'Product ID')

    return( async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)

        let item = user.cart.find(item => item.product.toString() === productId)
        
        if (item) item.quantity += quantity

        else {
            item = new Item({ quantity, product: productId })
            user.cart.push(item)
        }
        await user.save()
debugger
        const _user = await User.findById(userId)
        let _item = _user.cart.find(item => item.product.toString() === productId)
        if(_item.quantity < 0) _item.quantity = 0

        await _user.save()
    })()
}
module.exports = addToCart