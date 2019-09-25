require('dotenv').config()

const { expect } = require('chai')
const listToCart = require('.')
const { database, models: { User, Product, Item } } = require('datamodel')

const{ env: { DB_URL_TEST } } = process

describe ('logic - list cart', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity
    
    beforeEach(async() => {
        _quantity = Number((Math.random()*1000).toFixed())
        date = new Date()

        await User.deleteMany()

        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`
        
        const user = await User.create({ name, email, password })
        userId = user.id

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id 

        let item = new Item({ quantity: _quantity, product: productId })          
        user.cart.push(item)
        await user.save()              
    })

    it('should succeed on correct data',async () =>{
        await listToCart(userId)
        const user = await User.findById(userId)
        expect(user.cart[0]).to.exist
        expect(user.cart[0].quantity).to.equal(_quantity)
        expect(user.cart[0].product).to.exist
    })
    /* User ID */
    it('should fail on empty userId', () => {
        userId = ""
        expect(() => listToCart(userId)
        ).to.throw('User ID is empty or blank')
    })
    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() => listToCart(userId)
        ).to.throw(`User ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for userId', () => {
        userId = false
        expect(() => listToCart(userId)
        ).to.throw(`User ID with value false is not a string`)
    })

    after(() => database.disconnect())
})