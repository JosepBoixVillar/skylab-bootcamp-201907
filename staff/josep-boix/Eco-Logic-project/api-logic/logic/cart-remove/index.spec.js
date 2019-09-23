require('dotenv').config()

const { expect } = require('chai')
const { database,models:{ User, Product, Cart, Item } } = require('skyshop-data')

const{ env: { DB_URL_TEST} } = process

const removeProduct = require('.')

describe('logic - remove from cart', () => {

    before(() => database.connect(DB_URL_TEST))
    
    let name, email, password, userId, user
    let title, image, price, description, productId
    let _quantity, itemId
    
    beforeEach(async() => {

        _quantity = Number((Math.random()*1000).toFixed())
        date = new Date()

        await User.deleteMany()
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product = await Product.create({ title,image, price, description })
        productId = product.id 
        
        user = await User.create({ name, email, password })
        userId = user.id

        let item = new Item({product:productId,quantity:_quantity})
        debugger
        user.cart.push(item)
        await user.save()
                  
    })

    it('should succeed on correct data',async () =>{
        await removeProduct(userId,productId)

        const user=await User.findById(userId)
        expect(user.cart[0]).to.not.exist
    })

    it('should fail on empty userId', () =>
        expect(() =>
        removeProduct('',productId)
    ).to.throw('userId is empty or blank'))

    it('should fail on undefined userId', () =>
        expect(() =>
        removeProduct(undefined,productId)
    ).to.throw(`userId with value undefined is not a string`))

    it('should fail on wrong data type for userId', () =>
        expect(() =>
        removeProduct(123,productId)
    ).to.throw(`userId with value 123 is not a string`))

    it('should fail on empty productId', () =>
        expect(() =>
        removeProduct(userId,'')
    ).to.throw('productId is empty or blank'))

    it('should fail on undefined productId', () =>
        expect(() =>
        removeProduct(userId,undefined)
    ).to.throw(`productId with value undefined is not a string`))

    it('should fail on wrong data type for productId', () =>
        expect(() =>
        removeProduct(userId,123)
    ).to.throw(`productId with value 123 is not a string`))

    after(() => database.disconnect())
})