require('dotenv').config()

const { expect } = require('chai')
const addToCart = require('.')
const { database, models: { User, Product } } = require('datamodel')

const{ env: { DB_URL_TEST } } = process

describe ('logic - add to cart', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity
    
    beforeEach(async() => {
        _quantity = (Number((Math.random()*1000).toFixed())) //.toString()
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
    })

    it('should succeed on correct data', async () =>{
        await addToCart(userId, _quantity, productId)
              
        const user = await User.findById(userId)
        expect(user).to.exist
        expect(user.cart).to.exist
        expect((user.cart[0].quantity).toString()).to.equal(_quantity.toString())
        expect(user.cart[0].product._id.toString()).to.equal(productId)
    })

    /* Item */
    // it('should add +1 if the item already exists', async () =>{
    //     const item = new Item({ _quantity, product })
    //     const productId = item.product
    //     await item.save()

    //     try {
    //         await addToCart(userId, _quantity, productId)
    //     }catch(error) {
    //         expect(error).to.exist
    //         expect(error.message).to.equal('Item already exists.')
    //     }
    // })

    /* User ID */
    it ('should fail on unexisting User ID', async () => {
        userId = '41224d776a326fb40f000001'

        try {
            await addToCart(userId, _quantity, productId)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist`)
        }
    })
    it('should fail on empty userId', () => {
        userId = ""
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw('User ID is empty or blank')
    })
    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw(`User ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for userId', () => {
        userId = false
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw(`User ID with value false is not a string`)
    })
     /* Quantity */
     it('should fail on empty quantity', () => {
        _quantity = ""
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw('Quantity is empty or blank')
    })
    it('should fail on undefined quantity', () => {
        _quantity = undefined
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw(`Quantity with value undefined is not a number`)
    })
    it('should fail on wrong data type for quantity', () => {
        _quantity = false
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw(`Quantity with value false is not a number`)
    })
    /* Product ID */
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw('Product ID is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw(`Product ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => addToCart(userId, _quantity, productId)
        ).to.throw(`Product ID with value false is not a string`)
    })
   
    after(() => database.disconnect())
})