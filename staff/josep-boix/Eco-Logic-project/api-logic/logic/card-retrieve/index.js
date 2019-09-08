const validate = require('utils/validate')
const {models: { User } } = require('datamodel')

/**
 * Retrieve the card by the cardId of an user ID
 * 
 * @param {string} userId
 * @param {string} userId
 * 
 * @returns {Promise}
 */

module.exports = function(userId, cardId) {
    validate.string(userId, 'User ID')
    validate.string(cardId, 'Card ID')

    return( async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`User with id ${userId} does not exist.`)

        const card = user.cards.find(card => card.id === cardId)
        if(!card) throw Error(`Card with id ${cardId} does not exist.`)

        return card
    })()
}