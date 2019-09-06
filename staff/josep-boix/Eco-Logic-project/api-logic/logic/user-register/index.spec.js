const { expect } = require ('chai')
const logic = require ('..')
const {database, models: { User } } = require ('datamodel')

describe ('logic - register user', () => {

    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser:true }))

    let name, email, password

    beforeEach (() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        return User.deleteMany()
    })

    it ('should succeed on correct data', async () => {
        const result = await logic.register(name, email, password)
            expect(result).not.to.exist
        const user = await User.findOne({ email, password })
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)
    })
    it ('should fail if user already exists', async () => {
        await User.create({ name, email, password })

        try {
            await logic.register(name, email, password)
                // expect(result).not.to.exist
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('User already exists.')
        }
    })
    
    /* Name */
    it ('should fail on empty name', () => {
        name = ''
        expect(() => logic.register(name, email, password)
            ).to.throw(Error, 'name is empty or blank')
    })
    it ('should fail on undefined name', () => {
        name = undefined
        expect(() => logic.register(name, email, password)
            ).to.throw(Error, 'name with value undefined is not a string')
    })
    it ('should fail on not valid data type for name', () => {
        name = false
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'name with value false is not a string')
    })

    /* e-mail */
    it ('should fail on empty email', () => {
        email = ''
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'email is empty or blank')
    })
    it ('should fail on undefined email', () => {
        email = undefined
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'email with value undefined is not a valid e-mail')
    })
    it ('should fail on not valid data type for name', () => {
        email = false
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'email with value false is not a valid e-mail')
    })
    it ('should fail on not valid e-mail', () => {
        email = 'false#mail.com'
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'email with value false#mail.com is not a valid e-mail')
    })
    
    /* Password */
    it ('should fail on empty password', () => {
        password = ''
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'password is empty or blank')
    })
    it ('should fail on undefined password', () => {
        password = undefined
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'password with value undefined is not a string')
    })
    it ('should fail on not valid data type for password', () => {
        password = false
        expect(() => logic.register(name, email, password)
        ).to.throw(Error, 'password with value false is not a string')
    })

    after(() => database.disconnect())   
})