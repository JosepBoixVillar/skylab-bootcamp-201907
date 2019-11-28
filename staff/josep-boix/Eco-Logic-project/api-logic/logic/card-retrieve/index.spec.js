require ('dotenv').config()

const { expect } = require('chai')
const retrieveCard = require('.')
const { database, models: { User, Card } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe.only ('logic - retrieve card', () => { debugger

    before(() => database.connect(DB_URL_TEST))

    let userId, cardId

    beforeEach(() => {

        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        identifier = Number((Math.random()*1000000000).toFixed())
        expiry = '09/24'
        ccv = (Math.random() *1000).toFixed() 
            if (ccv < 10) ccv = '00' + ccv
            else if(ccv < 100) ccv = '0' + ccv
            else ccv 
        currency = 'EUR'

        return( async () => {
            await User.deleteMany()

            const newUser = await User.create({ name, email, password})
            userId = newUser.id
            
            const newCard = new Card({ identifier, expiry, ccv, currency })
            cardId = newCard.id

            newUser.cards.push(newCard)

            await newUser.save()
        })()
        
    })

    //happy-path
    it('should succeed on correct data', async () => {
        const card = await retrieveCard(userId, cardId)
        expect(card).to.exist
        expect(card._id).not.to.exist
        expect(card.id).to.be.a('string')
        expect(card.identifier).to.equal(identifier)
        expect(card.expiry).to.equal(expiry)
        expect(card.ccv).to.equal(ccv)
        expect(card.currency).to.equal(currency)
    })

    /* user ID */
    it('should fail if user does not exist', async () => {
        await User.deleteMany()
        try {
            await retrieveCard(userId, cardId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist.`)
        }
    })
    it('should fail wrong user ID', async () => {
        userId = '41224d776a326fb40f000001'
        try {
            await retrieveCard(userId, cardId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist.`)
        }
    })
    it('should fail on empty User ID', () => {
        userId = ''
        expect(() =>
            retrieveCard(userId, cardId)
        ).to.throw('User ID is empty or blank')
    }) 
    it('should fail on undefined User ID', () => {
        userId = undefined
        expect(() =>
            retrieveCard(userId, cardId)
        ).to.throw(`User ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for User ID', () => {
        userId = false 
        expect(() =>
            retrieveCard(userId, cardId)
        ).to.throw(`User ID with value false is not a string`)
    })

    /* card ID */
    it('should fail if card does not exist', async () => {
        const user = await User.findById(userId)
        expect(user).to.exist
        expect(user.id).to.equal(userId)

        user.cards = []
        const { cards } = user
        expect(cards).to.exist
        expect(cards).to.have.lengthOf(0)
        
        await user.save()

        try {
            await retrieveCard(userId, cardId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Card with id ${cardId} does not exist.`)
        }
    })
    it('should fail on wrong card ID', async () => {
        cardId = "123456789"
        try {
            await retrieveCard(userId, cardId)
        } catch(error) { 
            expect(error).to.exist
            expect(error.message).to.equal('Card with id 123456789 does not exist.')
        }
    })
    it('should fail on empty card ID', () => {
        cardId = ''
        expect(() =>
            retrieveCard(userId, cardId)
        ).to.throw('Card ID is empty or blank')
    })
    it('should fail on undefined Card ID', () => {
        cardId = undefined
        expect(() =>
            retrieveCard(userId, cardId)
        ).to.throw(`Card ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for Card ID', () => {
        cardId = false
        expect(() =>
            retrieveCard(userId, cardId)
        ).to.throw(`Card ID with value false is not a string`)
    })

    after(() => database.disconnect())
})