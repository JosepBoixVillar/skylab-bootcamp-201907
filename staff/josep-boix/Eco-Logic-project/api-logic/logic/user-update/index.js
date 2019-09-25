const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Update an user and setting the new fields by id
 * 
 * @param {string} id
 * @param {object} updatedFields
 * 
 * @returns {Promise}
 */

module.exports = function(id, updatedFields) {
    validate.string(id, 'id')
    // validate.object(updatedFields, 'updatedFields')
debugger
    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: updatedFields })
        if(!user) throw Error(`User id ${id} does not exist.`)
    })()
}