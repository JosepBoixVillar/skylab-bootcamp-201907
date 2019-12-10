require ('dotenv').config()

const { expect } = require ('chai')
const {database, models: { User } } = require ('datamodel')
const registerUser = require ('.')

const { env: { DB_URL_TEST } } = process

describe ('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password

    beforeEach (() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        return User.deleteMany()
    })

    //happy-path
    it ('should succeed on correct data', async () => {
        const result = await registerUser(name, email, password)
        expect(result).not.to.exist

        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)
        expect(user.password).to.exist
    })
    
    //error-path
    it ('should fail if user already exists', async () => {
        await User.create({ name, email, password })

        try {
            await registerUser(name, email, password)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('User already exists.')
        }
    })
    it ('should fail on empty name', () => {
        name = ''
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Name is empty or blank')
    })
    it ('should fail on undefined name', () => {
        name = undefined
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Name with value undefined is not a string')
    })
    it ('should fail on not valid data type for name', () => {
        name = false
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Name with value false is not a string')
    })
    it ('should fail on empty email', () => {
        email = ''
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Email with value undefined is not a valid e-mail')
    })
    it ('should fail on not valid data type for email', () => {
        email = false
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Email with value false is not a valid e-mail')
    })
    it ('should fail on not valid email', () => {
        email = 'false#mail.com'
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Email with value false#mail.com is not a valid e-mail')
    })
    it ('should fail on empty password', () => {
        password = ''
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => registerUser(name, email, password)
            ).to.throw(Error, 'Password with value false is not a string')
    })

    after(() => Promise.all([User.deleteMany()])
        .then (() => database.disconnect()))
})