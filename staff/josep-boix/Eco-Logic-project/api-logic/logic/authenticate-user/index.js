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

function authenticateUser (email, password) { debugger

    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email, password })
        if (!user) throw new Error ('wrong credentials') 
        return user.id
    })()

}

module.exports = authenticateUser