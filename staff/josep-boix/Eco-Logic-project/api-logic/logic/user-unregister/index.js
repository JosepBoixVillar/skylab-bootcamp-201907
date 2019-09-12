// logic user-unregister

const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Unregister an user by the user ID
 * 
 * @param {string} id
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */

module.exports = function (id, email, password) {
    validate.string(id, 'id')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        debugger
        const user = await User.deleteOne({ _id: id, email, password })
        if (!user.deletedCount) throw new Error ('There was an error unregistering the user')
    })()
}