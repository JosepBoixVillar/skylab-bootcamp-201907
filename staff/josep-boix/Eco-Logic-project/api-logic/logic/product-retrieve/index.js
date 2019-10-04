const validate = require('utils/validate')
const { models: { Product } } = require('datamodel')

/**
 * retrieve Products
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */

function retrieveProduct(id) {
    validate.string(id, 'id')

    return (async () => {
        const product = await Product.findById(id)

        if(!product) throw Error (`product ${id} not found`)

        product.id = id

        return product
    })()
}
module.exports = retrieveProduct