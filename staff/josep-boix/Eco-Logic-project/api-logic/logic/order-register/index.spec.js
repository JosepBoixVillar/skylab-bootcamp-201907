require('dotenv').config() 

const { expect } = require('chai')
const { database,models:{ User, Product, Item, Order } } = require('datamodel')

const{env: {DB_URL_TEST}}=process 

const registerOrder = require('.')


describe('logic - place order', () => {

    before(() => database.connect(DB_URL_TEST)) 
    
    let name, email, password, userId, user
    let title, image, price, description, productId
    let _quantity, itemId
    let orderId
    
    beforeEach(async() => {

        _quantity = Number((Math.random()*1000).toFixed())
        date= new Date()

        await User.deleteMany()
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product = await Product.create({ title, image, price, description })
        productId = product.id.toString()
        
        const user = await User.create({ name, email, password })
        userId = user.id
        
        let item = new Item({ product:productId, quantity:_quantity })
        user.cart.push(item)
        await user.save()
    })

    it('should succeed on correct data',async () =>{
        const result = await registerOrder(userId)
        orderId = result.id
        expect(result).to.exist

        const order = await Order.findById(orderId)
        expect(order).to.exist
        expect(order.date).to.exist
        expect(order.owner.toString()).to.equal(userId)
    }) 

    it('should fail on empty cart',async () =>{
        const user = await User.findById(userId)
        user.cart.pop()
        await user.save()
        try{
            await registerOrder(userId)

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Cart is empty')

        }
    }) 

    it('should fail on wrong user',async () =>{
        userId = '15985d5fe532b4f3f827e6fc64f87104'
        try{
            await registerOrder(userId)
            
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('User with id 5d5fe532b4f3f827e6fc64f8 does not exist')
        }
    }) 

    it('should fail on empty userId', () =>
        expect(() =>
        registerOrder('')
    ).to.throw('userId is empty or blank'))

    it('should fail on undefined userId', () =>
        expect(() =>
        registerOrder(undefined)
    ).to.throw(`userId with value undefined is not a string`))

    it('should fail on wrong data type for userId', () =>
        expect(() =>
        registerOrder(123)
    ).to.throw(`userId with value 123 is not a string`))

    after(() => database.disconnect())
})