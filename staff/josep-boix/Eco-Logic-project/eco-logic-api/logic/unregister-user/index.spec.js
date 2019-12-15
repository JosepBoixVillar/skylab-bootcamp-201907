require ('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password, userId

    beforeEach(async() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        userId = user.id
    })

    //happy-path
    it ('should succeed on correct data', async () => {
        const result = await unregisterUser(userId, email, password)
        expect(result).not.to.exist

        const findUser = await User.findById(userId)
        expect(findUser).not.to.exist
    })
    
    //error-path
    it ('should fail on unexisting registered user', async () => {
        userId = '41224d776a326fb40f000001'

        try {
            await unregisterUser(userId, email, password)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error unregistering the user')
        }
    })
    it ('should fail on empty user Id', () => {
        userId = ''
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'User Id is empty or blank')
    })
    it ('should fail on undefined user Id', () => {
        userId = undefined
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'User Id with value undefined is not a string')
    })
    it ('should fail on not valid data type for user Id', () => {
        userId = false
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'User Id with value false is not a string')
    })
    it ('should fail on existing user with wrong email', async () => {
        email = 'wrong_email@domain.com'

        try {
            await unregisterUser(userId, email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error unregistering the user')
        }
    })
    it ('should fail on empty email', () => {
        email = ''
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Email with value undefined is not a string')
    })
    it ('should fail on not valid data type for email', () => {
        email = false
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Email with value false is not a string')
    })
    it ('should fail on not valid email', () => {
        email = 'false#mail.com'
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Email with value false#mail.com is not a valid e-mail')
    })
    it ('should fail on existing user with wrong password', async () => {
        password = 'wrong_password'

        try {
            await unregisterUser(userId, email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error unregistering the user')
        }
    })
    it ('should fail on empty password', () => {
        password = ''
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => unregisterUser(userId, email, password)
            ).to.throw(Error, 'Password with value false is not a string')
    })
    

    after(() => Promise.all([User.deleteMany()])
        .then(() => database.disconnect()))
})