const validate = require ('utils/validate')
// const bcrypt = require ('bcryptjs')
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
    
    validate.string(name, 'name')
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(password, 'password')
    
    return (async () => {
        const user = await User.findOne({ email })
        if (user) throw new Error('User already exists.')

        // const hash = await bcrypt.hash(password, 10)
        // await User.create({ name, email, password: hash }) Crea un password més segur, però sobreescriu el password introduit per l'user
        await User.create({ name, email, password })

        return user
    })()
    
}
module.exports = registerUser