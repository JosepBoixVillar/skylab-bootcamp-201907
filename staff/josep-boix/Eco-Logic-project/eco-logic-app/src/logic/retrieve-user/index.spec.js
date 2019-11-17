import logic from '..'
import { database, models } from 'datamodel'
import jwt from 'jsonwebtoken'

const { User } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe ('logic - retrieve user', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        const user = await User.create({ name, email, password })
        userId = user.id

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
    })

    //happy-path
    it('should succeed on correct data', async () =>{
        const user = await logic.retrieveUser()
        expect(user).toBeDefined()
        expect(user.id).toBe(userId)
        expect(user._id).toBeUndefined()
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)
        expect(user.password).toBeUndefined() 
    })

    //error-path
    it('should throw an error with a wrong id', () => {
        logic.retrieveUser('5d5fe532b4f3f827e6fc64f8')
        .catch( error => {
            expect(error).toBeDefined()
            expect(error.message).toBe(`User does not exist.`)
        })
    })
    it ('should fail on empty user id', () => { 
        userId = ''
        logic.retrieveUser(userId)
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.message).toBe('User Id is empty or blank')
        })
    })
    it ('should fail on not valid type id', () => { 
        userId = undefined
        logic.retrieveUser(userId)
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.message).toBe('User Id with value undefined is not a string')
        })
    })
    it ('should fail on not valid type id', () => { 
        userId = false
        logic.retrieveUser(userId)
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.message).toBe('User Id with value false is not a string')
        })
    })
              
    afterAll(() => database.disconnect())

})