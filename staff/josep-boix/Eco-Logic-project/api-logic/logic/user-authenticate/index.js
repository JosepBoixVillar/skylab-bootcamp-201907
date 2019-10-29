// logic user-authenticate

const validate = require ('utils/validate')
const { models: { User } } = require ('datamodel')

/**
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */

 module.exports = function (email, password) { debugger
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findOne({ email, password })
        if (!user) throw new Error ('wrong credentials') 
        return user.id
    })()
 }