const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Unregister an user by the user ID
 * 
 * @param {string} userId
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */

function unregisterUser(userId, email, password) {

    validate.string(userId, 'User Id')
    validate.string(email, 'Email')
    validate.email(email, 'Email')
    validate.string(password, 'Password')

    return (async () => {
        const user = await User.deleteOne({ _id: userId, email, password })
        if (!user.deletedCount) throw new Error ('There was an error unregistering the user')
    })()

}
module.exports = unregisterUser