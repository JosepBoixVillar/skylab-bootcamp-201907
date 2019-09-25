require ('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        id = user.id
    })

    it ('should succeed on correct data', async () => {
        const result = await unregisterUser(id, email, password)
        expect(result).not.to.exist
        const findUser = await User.findById(id)
        expect(findUser).not.to.exist
    })

    /* id */
    it ('should fail on empty id', () => {
        id = ''
        expect(() => unregisterUser(id, email, password)
            ).to.throw(Error, 'id is empty or blank')
    })
    it ('should fail on undefined id', () => {
        id = undefined
        expect(() => unregisterUser(id, email, password)
            ).to.throw(Error, 'id with value undefined is not a string')
    })
    it ('should fail on not valid data type for id', () => {
        id = false
        expect(() => unregisterUser(id, email, password)
        ).to.throw(Error, 'id with value false is not a string')
    })
    it ('should fail on unexisting registered user', async () => {
        id = '41224d776a326fb40f000001'

        try {
            await unregisterUser(id, email, password)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error unregistering the user')
        }
    })

    /* e-mail */
    it ('should fail on empty email', () => {
        email = ''
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'email with value undefined is not a string')
    })
    it ('should fail on not valid data type for name', () => {
        email = false
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'email with value false is not a string')
    })
    it ('should fail on not valid e-mail', () => {
        email = 'false#mail.com'
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'email with value false#mail.com is not a valid e-mail')
    })
    it ('should fail on existing user with wrong email', async () => {
        email = 'wrong_email@domain.com'

        try {
            await unregisterUser(id, email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error unregistering the user')
        }
    })
    
    /* Password */
    it ('should fail on empty password', () => {
        password = ''
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => unregisterUser(name, email, password)
        ).to.throw(Error, 'password with value false is not a string')
    })
    it ('should fail on existing user with wrong password', async () => {
        password = 'wrong_password'

        try {
            await unregisterUser(id, email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error unregistering the user')
        }
    })

    after(() => database.disconnect()) 
})