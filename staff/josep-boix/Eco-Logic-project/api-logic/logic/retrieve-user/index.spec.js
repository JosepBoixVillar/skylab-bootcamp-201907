require ('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic _ retrieve-user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        id = user.id
    })

    /* id */
    it ('should succeed in correct data', async () => {
        const user = await retrieveUser(id)
            expect(user).to.exist
            expect(user.id).to.exist
            expect(user.name).to.equal(name)
            expect(user.email).to.equal(email)
            expect(user._id).not.to.exist
            expect(user.password).not.to.exist
    })
    it ('should fail on empty id', () => { 
        id = ''
        expect(() => 
            retrieveUser(id)
        ).to.throw(Error, 'id is empty or blank')
    })
    it ('should fail on not valid type id', () => { 
        id = undefined
        expect(() => 
            retrieveUser(id)
        ).to.throw(Error, 'id with value undefined is not a string')
    })
    it ('should fail on not valid type id', () => { 
        id = false
        expect(() => 
            retrieveUser(id)
        ).to.throw(Error, 'id with value false is not a string')
    })
    it ('should fail on uncorrect id', async () => {
        id = '41224d776a326fb40f000001'
        try {
            await retrieveUser(id)
            // throw new Error('should not to throw, sth wrong in the logic')
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User does not exist.')
        }                    
    })

    after(() => database.disconnect())
})