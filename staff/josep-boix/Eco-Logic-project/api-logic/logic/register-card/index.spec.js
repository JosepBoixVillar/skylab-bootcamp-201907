require ('dotenv').config()

const { expect } = require('chai')
const registerCard = require('.')
const { database, models: { User, Card } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe.only ('logic - register card', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password
    let id, randomUser, identifier, expiry, ccv, currency

    beforeEach (() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        identifier = Number((Math.random() *1000000000).toFixed())
        expiry = '09/24'
        ccv = (Math.random() *1000).toFixed() 
        if (ccv < 10) ccv = '00' + ccv
        else if(ccv < 100) ccv = '0' + ccv
        else ccv 
        currency = 'EUR'

        return(async () => {
            await User.deleteMany()
            const user = await User.create({ name, email, password })
            id = user.id
            randomUser = user
            await Card.deleteMany()
        })()
    })
    //happy-path
    it ('should succeed on correct data', async () => {
        const cardId = await registerCard(id, identifier, expiry, ccv, currency)
        expect(cardId).not.to.exist

        const user = await User.findById(id)
        expect(user).to.exist
        const { cards } = user
        expect(cards).to.exist
        expect(cards).to.have.lengthOf(1)
        // expect(cards[cards.length -1].id).to.equal(cards.id)

        const [card] = cards
        expect(card).to.exist
        expect(card.identifier).to.equal(identifier)
        expect(card.expiry).to.deep.equal(expiry)
        expect(card.ccv).to.equal(ccv)
        expect(card.currency).to.equal(currency)
    })

    //error-path
    it ('should fail on already existing card', () => {
        randomUser.cards.push(new Card({ identifier, expiry, ccv, currency }))
        return (async () => {
            try {
                await registerCard(id, identifier, expiry, ccv, currency)
            } catch (error) {
                expect(error).to.exist
                expiry(error.message).to.equal('Card already exists')
            }
        })()
    })
    it('should fail on wrong data id', async () => {
        id = "41224d776a326fb40f000001"
        try {
            await registerCard(id, identifier, expiry, ccv, currency)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('User with id 41224d776a326fb40f000001 does not exist.')
        }
    })
    it ('should fail on empty id', () => {
        id = ''
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('id is empty or blank')
    })
    it ('should fail on undefined id string', () => {
        id = undefined
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('id with value undefined is not a string')
    })
    it ('should fail on wrong data type id', () => {
        id = false
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('id with value false is not a string')
    })
    it ('should fail on empty card number', () => {
        identifier = ''
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('identifier is empty or blank')
    })
    it ('should fail on undefined card number', () => {
        identifier = undefined
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('identifier with value undefined is not a number')
    })
    it ('should fail on wrong data type card number', () => {
        identifier = false
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('identifier with value false is not a number')
    })
    it ('should fail on empty expiry string', () => {
        expiry = ''
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('expiry date is empty or blank')
    })
    it ('should fail on undefined expiry string', () => {
        expiry = undefined
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('expiry date with value undefined is not a string')
    })
    it ('should fail on wrong data type expiry string', () => {
        expiry = false
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('expiry date with value false is not a string')
    })
    it ('should fail on empty ccv string', () => {
        ccv = ''
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('ccv is empty or blank')
    })
    it ('should fail on undefined expiry string', () => {
        ccv = undefined
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('ccv with value undefined is not a string')
    })
    it ('should fail on wrong data type expiry string', () => {
        ccv = false
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('ccv with value false is not a string')
    })
    it ('should fail on empty currency string', () => {
        currency = ''
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('currency is empty or blank')
    })
    it ('should fail on undefined currency string', () => {
        currency = undefined
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('currency with value undefined is not a string')
    })
    it ('should fail on wrong data type currency string', () => {
        currency = false
        expect(() => 
        registerCard(id, identifier, expiry, ccv, currency)
            ).to.throw('currency with value false is not a string')
    })

    after(() => Promise.all([User.deleteMany()]) 
        .then(() => database.disconnect()))
})