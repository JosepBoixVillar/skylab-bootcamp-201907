// logic user-update

const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * 
 * @param {string} id
 * @param {object} updatedFields
 * 
 * @returns {Promise}
 */

module.exports = function(id, updatedFields) {
    validate.string(id, 'id')
    // validate.object(updatedFields, 'updatedFields')

    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: updatedFields })
        if(!user) throw Error('There was an error updating the user')
    })()
}