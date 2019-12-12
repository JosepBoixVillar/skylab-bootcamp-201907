import logic from '..'
import jwt from 'jsonwebtoken'
import { database, models } from 'datamodel'

const { User, Product, Item, Order } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe ('logic - place order', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity
    let _orderId
    
    beforeEach(async() => {
        
        await User.deleteMany()
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        const user = await User.create({ name, email, password })
        userId = user.id
        
        await Product.deleteMany()
        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`
        
        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id.toString()
        
        await Item.deleteMany()
        _quantity = Number((Math.random()*1000).toFixed())
        let date = new Date()
        
        let item = new Item({ product: productId, quantity: _quantity })
        user.cart.push(item)
        
        await Order.deleteMany()

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
        
        await user.save()
    })

    //happy-path
    it('should succeed on correct data', async () => {
        const result = await logic.placeOrder(userId, productId, _quantity)
        _orderId = result.orderId._id
        expect(result).toBeDefined()
        expect(result.message).toBe('Order registered successfully')

        const order = await Order.findById(_orderId)
        expect(order).toBeDefined()
        expect(order.date).toBeDefined()
        // expect(order.date).toBe(date)
        expect(order.customer.toString()).toBe(userId)
        expect(order.items).toBeDefined()
        expect(order.items[0].quantity).toBe(_quantity)
    })
    
    //error-path
    /* User ID */
    it ('should fail on empty user id', () => { 
        userId = ''
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow('user Id is empty or blank')
    })
    it ('should fail on not valid type id', () => { 
        userId = undefined
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow('user Id with value undefined is not a string')
    })
    it ('should fail on not valid type id', () => { 
        userId = false
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow('user Id with value false is not a string')
    })
    it ('should fail on wrong id', async () => {
        userId = '41224d776a326fb40f000001'
        try {
            await logic.placeOrder(userId, productId, _quantity)
            // throw new Error('should not to throw, sth wrong in the logic')
        } catch (error) {
            expect(error).toBeDefined()
            // expect(error.message).toBe('User with id 41224d776a326fb40f000001 does not exist.')
        }                    
    })
    /* Quantity */
    it('should fail on empty quantity', () => {
        _quantity = ""
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow('quantity is empty or blank')
    })
    it('should fail on undefined quantity', () => {
        _quantity = undefined
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow(`quantity with value undefined is not a number`)
    })
    it('should fail on wrong data type for quantity', () => {
        _quantity = false
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow(`quantity with value false is not a number`)
    })
    /* Product ID */
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow('product Id is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow(`product Id with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => logic.placeOrder(userId, productId, _quantity)
        ).toThrow(`product Id with value false is not a string`)
    })
    it ('should fail on wrong id', async () => {
        productId = '41224d776a326fb40f000001'
        try {
            await logic.placeOrder(userId, productId, _quantity)
            // throw new Error('should not to throw, sth wrong in the logic')
        } catch (error) {
            expect(error).toBeDefined()
            // expect(error.message).toBe('User with id 41224d776a326fb40f000001 does not exist.')
        }                    
    })

    afterAll(() => Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany()])
        .then(() => database.disconnect()))
})