require('dotenv').config() 

const { expect } = require('chai')
const placeOrder = require('.')
const { database, models: { User, Product, Item, Order } } = require('datamodel')

const { env: { DB_URL_TEST } } = process 

describe ('logic - place order', () => {
    before(() => database.connect(DB_URL_TEST)) 
    
    let name, email, password, userId
    let title, image, price, description, productId
    let _quantity
    let orderId
    
    beforeEach(async() => {
        _quantity = Number((Math.random()*1000).toFixed())
        date = new Date()

        await User.deleteMany()

        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        const user = await User.create({ name, email, password })
        userId = user.id

        await Product.deleteMany()

        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id.toString()
        
        let item = new Item({ product:productId, quantity:_quantity })
        itemId = item.id
        user.cart.push(item)
        await user.save()
    })

    it('should succeed on correct data',async () =>{
        const result = await placeOrder(userId)
        orderId = result.id
        expect(result).to.exist
        // expect(result.id).to.exist

        const order = await Order.findById(orderId)
        expect(order).to.exist
        expect(order.date).to.exist
        expect(order.customer.toString()).to.equal(userId)
    }) 

    it('should fail on empty cart',async () =>{
        const user = await User.findById(userId)
        user.cart.pop()
        await user.save()
        try{
            await placeOrder(userId)

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Cart is empty')
        }
    }) 

    it('should fail on wrong user',async () =>{
        userId = '41224d776a326fb40f000001'
        try{
            await placeOrder(userId)
            
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('User with id 41224d776a326fb40f000001 does not exist')
        }
    }) 

    it('should fail on empty userId', () =>{
        userId = ""
        expect(() => placeOrder(userId)).to.throw('userId is empty or blank')
    })

    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() => placeOrder(userId)).to.throw(`userId with value undefined is not a string`)
    })

    it('should fail on wrong data type for userId', () => {
        userId = 123
        expect(() => placeOrder(123)).to.throw(`userId with value 123 is not a string`)
    })

    after(() => Promise.all([User.deleteMany(), Product.deleteMany(), Item.deleteMany(), Order.deleteMany()])
        .then (() => database.disconnect()))
})