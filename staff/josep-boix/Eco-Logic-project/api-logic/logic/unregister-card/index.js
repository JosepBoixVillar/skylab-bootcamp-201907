const validate = require('utils/validate')
const { models: { User } } = require('datamodel')

/**
 * Unregister a card from an user by their ids
 * 
 * @param {string} userId
 * @param {string} cardId
 * 
 * @returns {Promise}
 */

function unregisterCard(userId, cardId) {

    validate.string(userId, 'User ID')
    validate.string(cardId, 'Card ID')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error (`User with id ${userId} not found.`)

        const findCard = await user.cards.find(card => card.id === cardId)
        if(!findCard) throw Error (`Card with id ${cardId} not found.`)
         
        user.cards.splice(user.cards.indexOf(findCard), 1)

        await user.save()
    })()
    
}
module.exports = unregisterCard