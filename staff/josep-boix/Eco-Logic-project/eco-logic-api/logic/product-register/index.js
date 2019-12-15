// const validate = require('utils/validate')
// const { models: { Product } } = require('datamodel')

// /**
//  * Register Products
//  * 
//  * @param {string} name
//  * @param {string} image
//  * @param {number} price
//  * @param {string} description
//  * 
//  * @returns {Promise}
//  */

// module.exports = async function(name, image, price, description) {
//     validate.string(name, 'name')
//     // validate.string(image, 'image')
//     validate.number(price, 'price')
//     validate.string(description, 'description')

//     return( async () => {
//         const product = await Product.findOne({ _id })
//         if(product) throw Error('Product already exists.')

//         await Product.create({ name, image, price, description })

//         return product.id
//     })
// }