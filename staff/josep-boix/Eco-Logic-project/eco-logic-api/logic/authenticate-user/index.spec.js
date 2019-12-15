require ('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic - authenticate user', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, email, password, userId
        
    beforeEach(() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            const user = await User.create({ name, email, password })
            userId = user.id
        })()
    })

    //happy-path
    it ('should succeed on correct data', async () => { debugger
        const response = await authenticateUser(email, password) 
        expect(response).to.exist
        expect(response).to.be.a('string')
        expect(response).to.equal(userId)

    })
    
    //error-path
    it ('should fail on not valid email', async () => {
        email = 'incorrect_mail@mail.com'

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials')
        }
    })
    it ('should fail on empty e-mail input', () => {
        email = ''
        expect(() => authenticateUser(email, password)
            ).to.throw(Error, 'email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => authenticateUser(email, password)
            ).to.throw(Error, 'email with value undefined is not a string')
    })
    it ('should fail on not valid email', () => {
        email = 'false#mail.com'
        expect(() => authenticateUser(email, password)
            ).to.throw(Error, 'email with value false#mail.com is not a valid e-mail')
    })
    it ('should fail on not valid password', async () => {
        password = 'incorrect_pass'

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials')
        }
    })
    it ('should fail on empty password', () => {
        password = ''
        expect(() => authenticateUser(email, password)
            ).to.throw(Error, 'password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => authenticateUser(email, password)
            ).to.throw(Error, 'password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => authenticateUser(email, password)
            ).to.throw(Error, 'password with value false is not a string')
    })

    after(() => Promise.all([User.deleteMany()])
        .then(() => database.disconnect()))

})