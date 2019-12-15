const validate = require('utils/validate')
const { models: { User, Card } } = require('datamodel')

/**
 * Register a card by an user id
 * 
 * @param {string} id
 * @param {Number} identifier
 * @param {string} expiry
 * @param {string} ccv
 * @param {string} currency
 * 
 * @returns {Promise}
 */

function registerCard(userId, identifier, expiry, ccv, currency) {

    validate.string(userId, 'User ID')
    validate.number(identifier, 'identifier')
    validate.string(expiry, 'expiry date')
    validate.string(ccv, 'ccv')
    validate.string(currency, 'currency')

    return(async () => {
    const user = await User.findById(userId)
    if(!user) throw Error(`User with id ${userId} does not exist.`)

    user.id = user._id
    delete user._id

    const card = user.cards.find(card => card.identifier === identifier)
    if(card) throw Error('Card already registered')

    const newCard = new Card({ identifier, expiry, ccv, currency})

    user.cards.forEach(card => {
        card.id = card._id
        delete card._id
    })

    user.cards.push(newCard)
    
    await user.save()
    })()

}
module.exports = registerCard