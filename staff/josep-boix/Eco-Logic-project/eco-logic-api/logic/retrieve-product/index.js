const validate = require('utils/validate')
const { models: { Product } } = require('datamodel')

/**
 * retrieves products
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */

function retrieveProduct(productId) {

    validate.string(productId, 'Product ID')

    return (async () => {
        const product = await Product.findById(productId)
        if(!product) throw Error (`Product ${productId} not found`)

        // productId = product.id

        product.id = product._id.toString()
        delete product._id

        return product
    })()
    
}
module.exports = retrieveProduct