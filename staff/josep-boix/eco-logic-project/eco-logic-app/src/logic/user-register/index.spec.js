import registerUser from '.'

const {database, models: { User } } = require ('datamodel')
const bcrypt = require('bcryptjs')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe ('logic - register user', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password

    beforeEach ( async () => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
    })

    it ('should succeed on correct data', async () => {
        const result = await registerUser(name, email, password)
        expect(result).toBeUndefined()
        
        const user = await User.findOne({ email })
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
    })
    it ('should fail if user already exists', async () => {
        await User.create({ name, email, password })

        try {
            await registerUser(name, email, password)
                // expect(result).not.to.exist
        } catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('User already exists.')
        }
    })
    
    /* Name */
    it ('should fail on empty name', () => {
        name = ''
        expect(() => registerUser(name, email, password)
            ).toThrowError('name is empty or blank')
    })
    it ('should fail on undefined name', () => {
        name = undefined
        expect(() => registerUser(name, email, password)
            ).toThrowError('name with value undefined is not a string')
    })
    it ('should fail on not valid data type for name', () => {
        name = false
        expect(() => registerUser(name, email, password)
        ).toThrowError('name with value false is not a string')
    })

    /* e-mail */
    it ('should fail on empty email', () => {
        email = ''
        expect(() => registerUser(name, email, password)
        ).toThrowError('email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => registerUser(name, email, password)
        ).toThrowError('email with value undefined is not a valid e-mail')
    })
    it ('should fail on not valid data type for name', () => {
        email = false
        expect(() => registerUser(name, email, password)
        ).toThrowError('email with value false is not a valid e-mail')
    })
    it ('should fail on not valid e-mail', () => {
        email = 'false#mail.com'
        expect(() => registerUser(name, email, password)
        ).toThrowError('email with value false#mail.com is not a valid e-mail')
    })
    
    /* Password */
    it ('should fail on empty password', () => {
        password = ''
        expect(() => registerUser(name, email, password)
        ).toThrowError('password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => registerUser(name, email, password)
        ).toThrowError('password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => registerUser(name, email, password)
        ).toThrowError('password with value false is not a string')
    })

    afterAll(() => database.disconnect())   
})