require ('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic - retrieve user', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, email, password, userId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        userId = user.id
    })

    //happy-path
    it ('should succeed in correct data', async () => {
        const user = await retrieveUser(userId)
        expect(user).to.exist
        expect(user.id).to.exist
        expect(user.id).to.equal(userId)
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)
        expect(user._id).not.to.exist
        expect(user.password).not.to.exist
    })
    
    //error-path
    it ('should fail on empty userId', () => { 
        userId = ''
        expect(() => 
            retrieveUser(userId)
        ).to.throw(Error, 'User Id is empty or blank')
    })
    it ('should fail on not valid type userId', () => { 
        userId = undefined
        expect(() => 
            retrieveUser(userId)
        ).to.throw(Error, 'User Id with value undefined is not a string')
    })
    it ('should fail on not valid type userId', () => { 
        userId = false
        expect(() => 
            retrieveUser(userId)
        ).to.throw(Error, 'User Id with value false is not a string')
    })
    it ('should fail on uncorrect userId', async () => {
        userId = '41224d776a326fb40f000001'
        try {
            await retrieveUser(userId)
            // throw new Error('should not to throw, sth wrong in the logic')
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User does not exist.')
        }                    
    })

    after(() => Promise.all([User.deleteMany()])
        .then(() => database.disconnect()))

})