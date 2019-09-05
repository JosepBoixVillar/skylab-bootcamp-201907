const { expect } = require('chai')
const authenticate = require('.')
const { database, models: { User } } = require('datamodel')

describe ('logic - authenticate user', () => {

    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser:true }))

    let name, email, password, id
        
    beforeEach(() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            const user = await User.create({ name, email, password })
            id = user.id
        })()
    })

    it ('should succeed on correct data', async () => {
        const retrieved_id = await authenticate(email, password) 

        expect(retrieved_id).to.exist
        expect(retrieved_id).to.be.a('string')
        expect(retrieved_id).to.equal(id)
    })

    it ('should fail on not valid data', async () => {
        let password = 'incorrect_pass'

        try {
            await authenticate(email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('wrong credentials')
        }
    })

    /* e-mail */
    it ('should fail on empty e-mail input', () => {
        email = ''
        expect(() => authenticate(email, password)
        ).to.throw(Error, 'email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => authenticate(email, password)
        ).to.throw(Error, 'email with value undefined is not a string')
    })
    it ('should fail on not valid e-mail', () => {
        email = 'false#mail.com'
        expect(() => authenticate(email, password)
        ).to.throw(Error, 'email with value false#mail.com is not a valid e-mail')
    })

    /* password */
    it ('should fail on empty password', () => {
        password = ''
        expect(() => authenticate(email, password)
        ).to.throw(Error, 'password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => authenticate(email, password)
        ).to.throw(Error, 'password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => authenticate(email, password)
        ).to.throw(Error, 'password with value false is not a string')
    })
})