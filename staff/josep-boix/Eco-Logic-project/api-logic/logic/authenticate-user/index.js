const validate = require ('utils/validate')
const { models: { User } } = require ('datamodel')

/**
 * Authenticate an user by params
 *  
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */

function authenticateUser (email, password) {

    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email, password })
        if (!user) throw new Error ('Wrong credentials') 

        user.id = user._id.toString()
        delete user._id

        return user.id
    })()

}
module.exports = authenticateUser