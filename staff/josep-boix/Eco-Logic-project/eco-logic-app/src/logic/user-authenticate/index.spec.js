require('dotenv').config()
import logic from '..'
import authenticateUser from '.'

const { database, models: { User } } = require('datamodel')
const bcrypt = require('bcrypt')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe ('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, id
        
    beforeEach(() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, email, password: hash })
        })()
    })

    it ('should succeed on correct data', async () => { debugger
        const retrieved_token = await authenticateUser(email, password) 

        expect(retrieved_token).toBeUndefined()
        expect(logic.__token__).toBeDefined()
    })

    /* e-mail */
    it ('should fail on empty e-mail input', () => {
        email = ''
        expect(() => authenticateUser(email, password)
        ).toThrow('email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => authenticateUser(email, password)
        ).toThrow('email with value undefined is not a string')
    })
    it ('should fail on not valid e-mail', () => {
        email = 'false#mail.com'
        expect(() => authenticateUser(email, password)
        ).toThrow('email with value false#mail.com is not a valid e-mail')
    })

    /* password */
    it ('should fail on not valid data', async () => {
        let password = 'incorrect_pass'

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('wrong credentials')
        }
    })
    it ('should fail on empty password', () => {
        password = ''
        expect(() => authenticateUser(email, password)
        ).toThrow('password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => authenticateUser(email, password)
        ).toThrow('password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => authenticateUser(email, password)
        ).toThrow('password with value false is not a string')
    })

    afterAll(() => database.disconnect())
})