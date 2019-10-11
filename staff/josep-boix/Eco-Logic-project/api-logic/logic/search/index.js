const validate = require('utils/validate')
const { models: { Product } } = require('datamodel')

/**
 * Search according to a query.
 *
 * @param {String} query 
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if domain or query are not found.
 * 
 * @returns {Promise} array of advertisement.
*/

function searchProduct(query) {
    validate.string(query, 'query')

    return (async () => {
        const product = await Product.find({ query })
        if(!product) throw Error(`product ${query} not found`)
        
        let productId = product._id

        const products = await Product.find({ "name": { "$regex": `${query}`, "$options": "i" }, product: productId },{ __v: 0 }).sort({_id: 1}).lean()
        if (!products) throw Error(`there are not products with query ${query}`)   
      
        return products
    })()
}
module.exports = searchProduct