const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Retrieve all cards of an user by user ID
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */

module.exports = function(id) {
    validate.string(id, 'id')

    return( async () => {
        const user = await User.findById(id)
        if(!user) throw Error(`User with id ${id} does not exist.`)

        user.cards.forEach(card => {
            card.id = card._id
            delete card._id
        })
        return user.cards
    })()
}