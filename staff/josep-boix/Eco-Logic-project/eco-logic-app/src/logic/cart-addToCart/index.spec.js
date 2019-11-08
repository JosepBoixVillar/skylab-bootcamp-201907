import logic from '..'
import addToCart from '.'
import  { database, models } from 'datamodel'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Product } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - add to cart', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity

    beforeEach(async() => {
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        _quantity = Number((Math.random()*1000).toFixed()) //.toString()
        // date = new Date()
        
        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`
        
        await User.deleteMany()
        await Product.deleteMany()

        const user = await User.create({ name, email, password })
        userId = user.id

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
    })

    it('should succeed on correct data',async () =>{
        await logic.addToCart(_quantity, productId)
              
        const user = await User.findById(userId)
        expect(user).toBeDefined()
        expect(user.cart).toBeDefined()
        expect(user.cart[0].quantity).toBe(_quantity)
    })

    // /* User ID */
    // it ('should fail on unexisting User ID', async () => {
    //     userId = '41224d776a326fb40f000001'

    //     try {
    //         await addToCart(userId, _quantity, productId)
    //     } catch(error) {
    //         expect(error).toBeDefined()
    //         // expect(error.message).toBe(`User with id ${userId} does not exist`)
    //     }
    // })
    // it('should fail on empty userId', () => {
    //     userId = ""
    //     expect(() => addToCart(userId, _quantity, productId)
    //     ).toThrow('userId is empty or blank')
    // })
    // it('should fail on undefined userId', () => {
    //     userId = undefined
    //     expect(() => addToCart(userId, _quantity, productId)
    //     ).toThrow(`userId with value undefined is not a string`)
    // })
    // it('should fail on wrong data type for userId', () => {
    //     userId = false
    //     expect(() => addToCart(userId, _quantity, productId)
    //     ).toThrow(`userId with value false is not a string`)
    // })
    /* Quantity */
    it('should fail on empty quantity', () => {
        _quantity = ""
        expect(() => addToCart(_quantity, productId)
        ).toThrow('quantity is empty or blank')
    })
    it('should fail on undefined quantity', () => {
        _quantity = undefined
        expect(() => addToCart(_quantity, productId)
        ).toThrow(`quantity with value undefined is not a number`)
    })
    it('should fail on wrong data type for quantity', () => {
        _quantity = false
        expect(() => addToCart(_quantity, productId)
        ).toThrow(`quantity with value false is not a number`)
    })
    /* Product ID */
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => addToCart(_quantity, productId)
        ).toThrow('productId is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => addToCart(_quantity, productId)
        ).toThrow(`productId with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => addToCart(_quantity, productId)
        ).toThrow(`productId with value false is not a string`)
    })

    afterAll(() => database.disconnect())  

})
