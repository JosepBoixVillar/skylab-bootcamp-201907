// logic user-register

const validate = require ('utils/validate')
const { models: { User } } = require ('datamodel')

/**
 * 
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */

module.exports = function (name, email, password) {
    validate.string(name, 'name')
    validate.email(email, 'email')
    validate.string(password, 'password')
    
    return (async () => {
        const user = await User.findOne({ email })
        if (user) throw new Error('User already exists.')
        await User.create({ name, email, password })
    })()
}