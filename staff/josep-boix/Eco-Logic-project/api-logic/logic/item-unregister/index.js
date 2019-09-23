const { models: { Item } } = require('datamodel')
const validate = require('utils/validate')

/**
 * Unregister an item.
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */

function unregisterItem (id) {
    validate.string(id, 'id')

    return(async()=>{
        const result=await Item.deleteOne({ _id: id })
        if (!result) throw new Error(`Product with id ${id} does not exist.`)
    })()
}
module.exports = unregisterItem