const { expect } = require('chai')
const registerCard = require('.')
const { database, models: { User } } = require('datamodel')

describe ('logic - register card', () => {
    before(() => database.connect('mongodb://localhost/api-test', { UserNewUrlParser: true}))

    let id, _user, _cardId, identifier, expiry, ccv, currency
    let name, email, password

    beforeEach (() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        identifier = Number((Math.random() *1000000000).toFixed())
        expiry = '09/24'
        ccv = `${((Math.random() *1000).toFixed())}`

        return(async () => {
            await User.deleteMany()
            const user = await User.create({ name, email, password })
            id = user.id
            _user = user
        })()
    })
    it ('should succeed on correct data', async () => {
        const cardId = await registerCard(id, identifier, expiry, ccv, currency)
        expect(cardId).to.exist

        const user = await User.findById(id)
        expect(user).to.exist

        const { cards } = user
        expect(cards).to.have.lengthOf(1)

        const [card] = cards
        expect(card).to.exist
        expect(card.identifier).to.equal(identifier)
        expect(card.expiry).to.deep.equal(expiry)
        expect(card.ccv).to.equal(ccv)
        expect(card.currency).to.equal('EUR')
    })

    after(() => database.disconnect())
})