import logic from '..'
import { database, models } from 'datamodel'
import jwt from 'jsonwebtoken'

const { User, Product, Item } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe ('logic - remove from cart', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity, itemId
    
    beforeEach(async() => {
        await User.deleteMany()
        await Product.deleteMany()
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        _quantity = Number((Math.random()*1000).toFixed())
        // date = new Date()

        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const user = await User.create({ name, email, password })
        userId = user.id

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id 

        let item = new Item({ quantity:_quantity, product:productId })
        itemId = item.id
        user.cart.push(item)

        await user.save()   

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
    })

    it('should succeed on correct data',async () =>{
        await logic.removeCart(userId, productId)

        const user = await User.findById(userId)
        expect(user.cart[0]).toBeUndefined()
    })
    /* User ID */
    it ('should fail on unexisting User ID', async () => {
        userId = '41224d776a326fb40f000001'

        try {
            await logic.removeCart(userId, productId)
        } catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`User with id ${userId} does not exist`)
        }
    })
    it('should fail on empty userId', () => {
        userId = ""
        expect(() => logic.removeCart(userId, productId)
        ).toThrow('user id is empty or blank')
    })
    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() => logic.removeCart(userId, productId)
        ).toThrow(`user id with value undefined is not a string`)
    })
    it('should fail on wrong data type for userId', () => {
        userId = false
        expect(() => logic.removeCart(userId, productId)
        ).toThrow(`user id with value false is not a string`)
    })
    /* Product ID */
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => logic.removeCart(userId, productId)
        ).toThrow('product id is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => logic.removeCart(userId, productId)
        ).toThrow(`product id with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => logic.removeCart(userId, productId)
        ).toThrow(`product id with value false is not a string`)
    })

    afterAll(() => database.disconnect())
})