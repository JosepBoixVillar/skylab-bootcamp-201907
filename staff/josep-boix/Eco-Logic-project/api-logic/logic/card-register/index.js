const validate = require('utils/validate')
const { models: { User, Card } } = require('datamodel')

/**
 * It registers a card associated to an user
 * 
 * @param {string} id
 * @param {Number} identifier
 * @param {string} expiry
 * @param {string} ccv
 * @param {string} currency
 * 
 * @returns {Promise}
 */

 module.exports = function(id, identifier, expiry, ccv, currency) {
     validate.string(id, 'id')
     validate.number(identifier, 'identifier')
     validate.string(expiry, 'expiry date')
     validate.string(ccv, 'ccv')
     validate.string(currency, 'currency')

     return(async () => {
        const user = await User.findById(id)
        if(!user) throw Error(`User with id ${id} does not exist.`)

        const card = user.cards.find(card => card.identifier === identifier)
        if(card) throw Error('Card already registered')

        const newCard = new Card({ identifier, expiry, ccv, currency})

        user.cards.push(newCard)
        await user.save()
        debugger
        return user.cards[user.cards.length -1].id
     })()
 }