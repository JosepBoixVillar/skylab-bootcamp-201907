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
    let _quantity
    
    beforeEach(async() => {
        
        await User.deleteMany()
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        const user = await User.create({ name, email, password })
        userId = user.id

        // await Product.deleteMany()
        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`
        
        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id 
        
        // await Item.deleteMany()
        _quantity = Number((Math.random()*1000).toFixed())

        let item = new Item({ quantity:_quantity, product:productId })
        user.cart.push(item)
        
        await user.save()   

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token
    })

    //happy-path
    it('should succeed on correct data',async () =>{
        await logic.removeCart(productId)

        const user = await User.findById(userId)
        expect(user.cart[0]).toBeUndefined()
    })
    
    //error-path
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => logic.removeCart(productId)
        ).toThrow('product id is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => logic.removeCart(productId)
        ).toThrow(`product id with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => logic.removeCart(productId)
        ).toThrow(`product id with value false is not a string`)
    })
    it ('should fail if product not exists', async () => {
        await Product.deleteMany()

        try {
            await logic.retrieveOrder(productId)
        } catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`User with id ${userId} do not have any orders`)
        }
    })

    afterAll(() => Promise.all([User.deleteMany(), Product.deleteMany(), Item.deleteMany()])
        .then (() => database.disconnect()))

})