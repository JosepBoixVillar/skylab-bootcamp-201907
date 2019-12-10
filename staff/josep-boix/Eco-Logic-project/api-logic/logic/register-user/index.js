const validate = require ('utils/validate')
const bcrypt = require ('bcryptjs')
const { models: { User } } = require ('datamodel')

/**
 * Register an user by user imputs
 * 
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise}
 */

function registerUser (name, email, password) {
    
    validate.string(name, 'Name')
    validate.email(email, 'Email')
    validate.string(email, 'Email')
    validate.string(password, 'Password')
    
    return (async () => {
        const user = await User.findOne({ email })
        if (user) throw new Error('User already exists.')

        const hash = await bcrypt.hash(password, 10)
        await User.create({ name, email, password: hash })
        // await User.create({ name, email, password })

        return user
    })()
    
}
module.exports = registerUser