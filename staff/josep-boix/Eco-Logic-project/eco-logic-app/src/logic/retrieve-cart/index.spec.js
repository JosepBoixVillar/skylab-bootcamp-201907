import logic from '..'
import jwt from 'jsonwebtoken'

const { database, models: { User, Product, Item } } = require('datamodel')
const { env: { REACT_APP_DB_URL_TEST } } = process
const { env: { REACT_APP_JWT_SECRET_TEST } } = process

describe ('logic - retrieve cart', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity

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
        user.cart.push(item)

        await user.save()   

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token

    })

    //happy-path
    it ('should succeed on correct id', async () => {
        const cart = await logic.retrieveCart(userId)
        expect(cart).toBeDefined()
        expect(cart[0]._id).toBeDefined()
        expect(cart[0].product._id).toBe(productId)
        expect(cart[0].product.title).toBe(title)
        expect(cart[0].product.categorie).toBe(categorie)
        expect(cart[0].product.image).toBe(image)
        expect(cart[0].product.price).toBe(price)
        expect(cart[0].product.description).toBe(description)
        expect(cart[0].quantity).toBe(1)
    })

    //error-path
    it ('should fail on empty user id', async () => { 
        await User.deleteMany()

        try{
            await logic.retrieveCart()
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`User with id ${userId} does not exist`)
        }
    })
    
    afterAll(() =>  Promise.all([User.deleteMany(), Product.deleteMany(), Item.deleteMany()])
        .then (() => database.disconnect()))
    
})