const { expect } = require('chai')
const retrieveAll = require('.')
const { database, models: { User, Card } } = require('datamodel')

describe ('logic - retrieveAll cards', () => {
    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser: true }))

    let userId, cardId, cardId2,
        name, email, password,
        identifier, expiry, ccv, currency,
        identifier2, expiry2, ccv2, currency2
        
    beforeEach(() => {
        debugger
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

        identifier2 = Number((Math.random()*1000000000).toFixed())
        expiry2 = '05/25'
        ccv2 = (Math.random() *1000).toFixed() 
        if (ccv2 < 10) ccv2 = '00' + ccv2
        else if(ccv2 < 100) ccv2 = '0' + ccv2
        else ccv2 
        currency2 = 'USD'

        return( async () => {
            await User.deleteMany()
            const user = await User.create({ name, email, password })
            userId = user.id

            const newCard = new Card({ identifier, expiry, ccv, currency })
            cardId = newCard.id
            user.cards.push(newCard)
            const newCard2 = new Card({ identifier:identifier2, expiry:expiry2, ccv:ccv2, currency:currency2 })
            cardId2 = newCard2.id
            user.cards.push(newCard2)

            await user.save()
        })()
    })

    it('should succeed on correct data', async () => {
        debugger
        const cards = await retrieveAll(userId)
        expect(cards).to.exist

        const card1 = cards.find(card => card.id.toString() === cardId)
        expect(card1).to.exist
        expect(cardId._id).not.to.exist
        expect(card1.identifier).to.equal(identifier)
        expect(card1.expiry).to.equal(expiry)
        expect(card1.ccv).to.equal(ccv)
        expect(card1.currency).to.equal(currency)
        const card2 = cards.find(card => card.id.toString() === cardId2)
        expect(card2).to.exist
        expect(cardId2._id).not.to.exist
        expect(card2.identifier).to.equal(identifier2)
        expect(card2.expiry).to.equal(expiry2)
        expect(card2.ccv).to.equal(ccv2)
        expect(card2.currency).to.equal(currency2)
    })

    /* User ID */
    it('should fail if user does not exist', async () => {
        await User.deleteMany()

        try {
            await User.findById(userId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist.`)
        }
    })
    it('should fail on wrong id', async () => {
        userId = '41224d776a326fb40f000001'

        try {
            await User.findById(userId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist.`)
        }
    })
    it('should fail on empty User ID', () => {
        userId = ''
        expect(() => retrieveAll(userId)
        ).to.throw('User ID is empty or blank')
    })
    it('should fail on undefined User ID', () => {
        userId = undefined
        expect(() => retrieveAll(userId)
        ).to.throw('User ID with value undefined is not a string')
    })
    it('should fail on wrong data type for User ID', () => {
        userId = false
        expect(() => retrieveAll(userId)
        ).to.throw('User ID with value false is not a string')
    })
    
    after(() => database.disconnect())
})