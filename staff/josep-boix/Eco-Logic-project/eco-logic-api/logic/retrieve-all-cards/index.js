const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Retrieve all cards of an user by user ID
 * 
 * @param {string} userId
 * 
 * @returns {Promise}
 */

module.exports = function(userId) {
    validate.string(userId, 'User ID')

    return( async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`User with id ${userId} does not exist.`)

        user.cards.forEach(card => {
            card.id = card._id
            delete card._id
        })

        return user.cards
    })()
}