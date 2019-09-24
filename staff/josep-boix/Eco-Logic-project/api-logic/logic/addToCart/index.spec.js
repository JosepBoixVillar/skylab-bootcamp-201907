require('dotenv').config()

const { expect } = require('chai')
const { database,models:{User, Product, Cart} } = require('datamodel')
const{ env: { DB_URL_TEST } } = process

const addToCart = require('.')

describe ('logic - add to cart', () => {

    before(() => database.connect(DB_URL_TEST))

    let name, email, password, userId
    let title, image, price, description, productId
    let _quantity, itemId
    let date
    
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

        const product=await Product.create({ title,image, price, description })
        productId = product.id 

        const user=await User.create({ name, email, password })
        userId = user.id
    })

    it('should succeed on correct data',async () =>{
        debugger
        await addToCart(userId,productId,_quantity)
              
        const user=await User.findById(userId)
        expect(user).to.exist
        expect(user.cart).to.exist
        expect(user.cart[0].quantity).to.equal(_quantity)
    })

    it('should fail if the item already exists',async () =>{
        const item = new Item({ quantity })
        item.product=id
        await item.save()
        try{
            await addToCart(id, quantity)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Item already exists.')
        }
    })
    it('should fail on empty id', () => 
        expect(() => 
               register("", quantity)
    ).to.throw('id is empty or blank'))
     it('should fail on undefined id', () => 
        expect(() => 
        register(undefined, quantity)
    ).to.throw(`id with value undefined is not a string`))

    it('should fail on empty userId', () =>
        expect(() =>
        addToCart('',productId,_quantity)
    ).to.throw('userId is empty or blank'))
    it('should fail on undefined userId', () =>
        expect(() =>
        addToCart(undefined,productId,_quantity)
    ).to.throw(`userId with value undefined is not a string`))
    it('should fail on wrong data type for userId', () =>
        expect(() =>
        addToCart(123,productId,_quantity)
    ).to.throw(`userId with value 123 is not a string`))   

    it('should fail on empty productId', () =>
        expect(() =>
        addToCart(userId,'',_quantity)
    ).to.throw('productId is empty or blank'))

    it('should fail on undefined productId', () =>
    expect(() =>
           addToCart(userId,undefined,_quantity)
    ).to.throw(`productId with value undefined is not a string`))

    it('should fail on wrong data type for productId', () =>
        expect(() =>
        addToCart(userId,123,_quantity)
    ).to.throw(`productId with value 123 is not a string`))

    it('should fail on wrong data type for _quantity', () =>
        expect(() =>
        addToCart(userId,productId,'123')
    ).to.throw(`quantity with value 123 is not a number`))

    it('should fail on wrong data type for _quantity', () =>
        expect(() =>
        addToCart(userId,productId,'')
    ).to.throw(`quantity with value  is not a number`))

    after(() => database.disconnect())
})