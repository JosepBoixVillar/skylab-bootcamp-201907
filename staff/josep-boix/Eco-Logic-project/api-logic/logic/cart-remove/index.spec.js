require('dotenv').config()

const { expect } = require('chai')
const removeProduct = require('.')
const { database, models: { User, Product, Cart, Item } } = require('datamodel')

const{ env: { DB_URL_TEST} } = process


describe ('logic - remove from cart', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity, itemId
    
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

        let item = new Item({ quantity:_quantity, product:productId })
        itemId = item.id
        user.cart.push(item)
        await user.save()   
    })

    it('should succeed on correct data',async () =>{
        await removeProduct(userId, productId)

        const user = await User.findById(userId)
        expect(user.cart[0]).to.not.exist
    })
    /* User ID */
    it ('should fail on unexisting User ID', async () => {
        userId = '41224d776a326fb40f000001'

        try {
            await removeProduct(userId, productId)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist`)
        }
    })
    it('should fail on empty userId', () => {
        userId = ""
        expect(() => removeProduct(userId, productId)
        ).to.throw('User ID is empty or blank')
    })
    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() => removeProduct(userId, productId)
        ).to.throw(`User ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for userId', () => {
        userId = false
        expect(() => removeProduct(userId, productId)
        ).to.throw(`User ID with value false is not a string`)
    })
    /* Product ID */
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => removeProduct(userId, productId)
        ).to.throw('Product ID is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => removeProduct(userId, productId)
        ).to.throw(`Product ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => removeProduct(userId, productId)
        ).to.throw(`Product ID with value false is not a string`)
    })

    after(() => database.disconnect())
})