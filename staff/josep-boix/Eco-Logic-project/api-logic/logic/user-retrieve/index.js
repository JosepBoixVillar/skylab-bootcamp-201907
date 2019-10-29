// logic user-retrieve

const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Retrieve the user information by user ID
 * 
 * @param {string} id
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * 
 * @returns {Promise}
 */

module.exports = function (id) {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0}).lean()
        if(!user) throw new Error(`User with id ${id} does not exist.`)
        
        user.id = id
        
        return user
    })()
}