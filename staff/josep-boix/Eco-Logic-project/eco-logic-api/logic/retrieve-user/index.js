const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Retrieves data user by user ID
 * 
 * @param {string} userId
 * 
 * @returns {Promise}
 */

function retrieveUser(userId) {
    
    validate.string(userId, 'User Id')

    return (async () => {
        const user = await User.findOne({ _id: userId }, { _id: 0, password: 0}).lean()
        if(!user) throw new Error(`User does not exist.`)
        
        user.id = userId
        
        return user
    })()
    
}
module.exports = retrieveUser