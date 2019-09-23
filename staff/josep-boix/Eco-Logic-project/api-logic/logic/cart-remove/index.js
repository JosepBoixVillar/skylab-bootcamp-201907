const { models: { Product, User, Order, Item } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Removes one product from the cart
 * 
 * @param {*} userId 
 * @param {*} productId 
 * 
 * @returns {Promise}
 */

function cartRemove(userId, productId) {
    
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    return (async () => {
        const user = await User.findById(userId)
        

        if (!user) throw Error('User not found')

        let item = user.cart.findIndex(item => { 
            debugger
            return item.product.toString() === productId
            
         })

        if (item > -1) await user.cart.splice(item,1)
        if (item <0) throw Error("Item not found")
        
        await user.save()
    })()
}
module.exports = cartRemove