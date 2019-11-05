import logic from '..'
import jwt from 'jsonwebtoken'

const { database, models: { User, Product, Item } } = require('datamodel')
const { env: { REACT_APP_DB_URL_TEST } } = process
const { env: { REACT_APP_JWT_SECRET_TEST } } = process

describe.only ('logic - retrieve cart', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity
debugger
    beforeEach(async () => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        userId = user.id

        title = `title-${Math.random()}`
        categorie = `Categorie-${Math.random()}`
        image = `image-${Math.random()}@domain.com`
        price = Math.random()
        description = `description-${Math.random()}@domain.com`

        await Product.deleteMany()
        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id

        let item = new Item({ quantity:_quantity, product:productId })
        // itemId = item.id
        user.cart.push(item)

        await user.save()   

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token

    })

    /* id */
    it ('should succeed on correct id', async () => {
        const cart = await logic.retrieveCart(userId)
        expect(cart).toBeDefined()
        // expect(cart.id).toBeDefined()
        // expect(cart.name).toBe(name)
        // expect(cart.email).toBe(email)
        // expect(cart._id).not.to.exist
        // expect(cart.password).not.to.exist
    })
    // it ('should fail on empty user id', () => { 
    //     id = ''
    //     expect(() => retrieveUser(id)
    //     ).toBe('id is empty or blank')
    // })
    // it ('should fail on not valid type id', () => { 
    //     id = undefined
    //     expect(() => retrieveUser(id)).toBe('id with value undefined is not a string')
    // })
    // it ('should fail on wrong id', async () => {
    //     id = '41224d776a326fb40f000001'
    //     try {
    //         await retrieveUser(id)
    //         // throw new Error('should not to throw, sth wrong in the logic')
    //     } catch (error) {
    //         expect(error).toBeDefined()
    //         expect(error.message).toBe('User with id 41224d776a326fb40f000001 does not exist.')
    //     }                    
    // })

    afterAll(() => database.disconnect())
})