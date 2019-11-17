require('dotenv').config() 

const listOrders = require('.')
const { expect } = require('chai')
const { database, models: { User, Product, Item, Order } } = require('datamodel')

const{ env: { DB_URL_TEST } } = process 

describe.only ('logic - list orders', () => {

    before(() => database.connect(DB_URL_TEST)) 
    
    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity, date

    beforeEach(async() => {
        await User.deleteMany()
        await Order.deleteMany()
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        title = `Baloon-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        _quantity = Number((Math.random()*1000).toFixed())
        date = new Date()
        
        const user = await User.create({ name, email, password })
        userId = user.id.toString()

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id.toString()
        
        let item = new Item({ quantity: _quantity, product: productId })
        itemId = item.id.toString()
        user.cart.push(item)

        // let item2 = new Item({ quantity: _quantity, product: productId })
        // itemId = item2.id.toString()
        // user.cart.push(item2)

        await user.save()

        let order = new Order({ date:date, customer: userId, items: user.cart })
        orderId = order.items[0].id.toString()
        order.items.push(user.cart.item)
        await order.save()
    })

    //happy-path
    it('should succeed on correct data', async () =>{
        const orders = await listOrders(userId)
        expect(orders).to.exist
        expect(orders[0].customer.toString()).to.equal(userId)
        expect(orders[0].date).to.deep.equal(date)
        expect(orders[0].items[0].quantity).to.equal(_quantity)
        expect(orders[0].items[0].id).to.equal(undefined)
    }) 
   
    it('should throw on empty orders',async () => {
        Order.deleteMany()
        try {
            await listOrders(userId)       
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} do not have any orders`)
        }
    }) 
   
    /* User ID */
    it('should fail on wrong user',async () => {
        userId = '41224d776a326fb40f000001'
        try {
            await listOrders(userId)       
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userId} does not exist`)
        }
    }) 
    it('should fail on empty userId', () => {
        userId = ""
        expect(() => listOrders(userId)
        ).to.throw('userId is empty or blank')
    })
    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() => listOrders(undefined)
        ).to.throw(`userId with value undefined is not a string`)
    })
    it('should fail on wrong data type for userId', () => {
        userId = false
        expect(() => listOrders(123)
        ).to.throw(`userId with value 123 is not a string`)
    })

    after(() => database.disconnect())

})