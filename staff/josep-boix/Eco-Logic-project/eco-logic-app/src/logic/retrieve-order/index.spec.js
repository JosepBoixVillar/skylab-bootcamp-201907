import logic from '..'
import jwt from 'jsonwebtoken'

const { database, models: { User, Product, Item, Order } } = require('datamodel')
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe ('logic - retrieve orders', () => {
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity, date, orderId

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

        _quantity= Number((Math.random()*1000).toFixed())
        date = new Date()

        await Item.deleteMany()
        await Order.deleteMany()

        let item = new Item({ quantity:_quantity, product:productId })
        // itemId = item.id
        user.cart.push(item)

        let order = await Order.create({ date, customer: userId, items:item})
        order.id = orderId

        await user.save()   

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token

    })

    //happy-path
    it ('should succeed on correct id', async () => {
        const cart = await logic.retrieveOrder()
        expect(cart).toBeDefined()
        expect(cart[0].id).toBeDefined()
        expect(cart[0].date).toBeDefined()
        expect(cart[0].customer).toBe(userId)
        expect(cart[0].items[0].product.title).toBe(title)
        expect(cart[0].items[0].product.categorie).toBe(categorie)
        expect(cart[0].items[0].product.image).toBe(image)
        expect(cart[0].items[0].product.price).toBe(price)
        expect(cart[0].items[0].product.description).toBe(description)
        expect(cart[0].items[0].quantity).toBe(_quantity)
    })

    //error-path
    it ('should fail if user have no orders', async () => { debugger
        await Order.deleteMany()

        try {
            await logic.retrieveOrder()
        } catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`User with id ${userId} do not have any orders`)
        }
    })

    afterAll(() => Promise.all([user.deleteMany(), Product.deleteMany(), Item.deleteMany(), Order.deleteMany()])
        .then (() => database.disconnect()))
    
})