// logic user-retrieve

const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Retrieves data user by user ID
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */

module.exports = function (id) {
    
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0}).lean()
        if(!user) throw new Error(`User does not exist.`)
        
        user.id = id
        
        return user
    })()
    
}