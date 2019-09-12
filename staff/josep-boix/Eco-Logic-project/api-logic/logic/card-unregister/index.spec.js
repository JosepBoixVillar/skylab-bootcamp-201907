const { expect } = require('chai')
const unregisterCard = require('.')
const { database, models: { User, Card } } = require('datamodel')

describe ('logic - unregister card', () => {
    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser: true }))

    let userId, cardId

    beforeEach(async () => {
        await User.deleteMany()

        let name, email, password
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        cardIdentifier = Number((Math.random() * 1000000000).toFixed())
        cardExpiry = '09/24'
        ccvNum = (Math.random() *1000).toFixed() 
        if (ccvNum < 10) ccv = '00' + ccvNum
        else if(ccvNum < 100) ccv = '0' + ccvNum
        else ccvNum 
        defCurrency = 'EUR'

        const newUser = await User.create({ name, email, password })
        userId = newUser.id

        const newCard = await Card.create({ identifier:cardIdentifier, expiry:cardExpiry, ccv:ccvNum, currency:defCurrency })
        cardId = newCard.id

        newUser.cards.push(newCard)
        
        await newUser.save()
    })
    it('should succeed on correct data', async () => {
        const card = await unregisterCard(userId, cardId)
        expect(card).not.to.exist

        const findUser = await User.findById(userId)
        expect(findUser).to.exist

        const findCard = await findUser.cards.find(card => card.id === cardId)
        expect(findCard).to.be.undefined

    })

    /* user ID */
    it('should fail on wrong user ID', async () => {
        userId = "41224d776a326fb40f000001"
        try {
            await unregisterCard(userId, cardId)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('User with id 41224d776a326fb40f000001 not found.')
        }
    })
    it('should fail on empty user ID', () => {
        userId = ''
        expect(() => unregisterCard(userId, cardId)
        ).to.throw('user ID is empty or blank')
    })
    it('should fail on undefined user ID', () => {
        userId = undefined
        expect(() => unregisterCard(userId, cardId)
        ).to.throw('user ID with value undefined is not a string')
    })
    it('should fail on wrong type for user ID', () => {
        userId = false
        expect(() => unregisterCard(userId, cardId)
        ).to.throw('user ID with value false is not a string')
    })

    /* card ID */
    it('should fail on wrong card ID', async () => {
        cardId = "123456789"
        try {
            await unregisterCard(userId, cardId)
        } catch(error) { 
            expect(error).to.exist
            expect(error.message).to.equal('Card with id 123456789 not found.')
        }
    })
    it('should fail on empty card ID', () => {
        cardId = ''
        expect(() => unregisterCard(userId, cardId)
        ).to.throw('card ID is empty or blank')
    })
    it('should fail on undefined card ID', () => {
        cardId = undefined
        expect(() => unregisterCard(userId, cardId)
        ).to.throw('card ID with value undefined is not a string')
    })
    it('should fail on wrong type for card ID', () => {
        cardId = false
        expect(() => unregisterCard(userId, cardId)
        ).to.throw('card ID with value false is not a string')
    })

    after(() => database.disconnect())
})