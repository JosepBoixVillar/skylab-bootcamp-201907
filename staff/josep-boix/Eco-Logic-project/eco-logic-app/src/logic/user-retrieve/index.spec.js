import logic from '..'
import jwt from 'jsonwebtoken'

const  { database, models: { User } } = require('datamodel')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, id, token

    beforeEach(async() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()

        const user = new User({ name, email, password })
        id = user.id
        
        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token

        await user.save()
    })

    it('should succeed on correct data', async() =>{
        const user = await logic.retrieveUser()
        
        expect(user).toBedefined
        expect(user.id).toBe(id)
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)
        expect(user.password).toBeUndefined()
    })

    // it('should fail with a wrong token', async () =>{
    //     try {
    //         await logic.retrieveUser()
    //     } catch(error) {
    //         expect(error).toBeDefined()
    //     }
    // })

// it('should fail on empty token', () =>{
//     token = ""
//     logic.__token__ = token
//     expect(() => logic.retrieveUser(id)).toBe('id is empty or blank')
// })

//     it('should fail on undefined token', () =>{
//         logic.__credentials__ = { id:undefined, token }
//         expect(() =>
//         logic.retrieveUser( )
//         ).toThrow(`id with value undefined is not a string`)
//     })

    afterAll(() => database.disconnect())

})