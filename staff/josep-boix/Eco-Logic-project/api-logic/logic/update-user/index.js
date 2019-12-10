const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Update an user and setting the new fields by id
 * 
 * @param {string} userId
 * @param {object} updatedFields
 * 
 * @returns {Promise}
 */

function updateUser(userId, updatedFields) {
    
    validate.string(userId, 'User ID')
    // validate.object(updatedFields, 'updatedFields')

    return (async () => {
        const user = await User.findByIdAndUpdate(userId, { $set: updatedFields })
        if(!user) throw Error(`User id ${userId} does not exist.`)
    })()
    
}
module.exports = updateUser