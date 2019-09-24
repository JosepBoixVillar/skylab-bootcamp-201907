require('dotenv').config() 

const { expect } = require('chai')
const retrieveAllOrders = require('.')
const { database, models: { User, Product, Item, Order } } = require('datamodel')

const{ env: { DB_URL_TEST } } = process

describe ('logic - retrieve all orders', () => {
    before(() => database.connect(DB_URL_TEST)) 
    
    let name, email, password, userId
    let title, categorie, image, price, description, productId
    let _quantity, date
    // let orderId, itemId
    
    beforeEach(async() => {
        _quantity = Number((Math.random()*1000).toFixed())
        date= new Date()

        await Order.deleteMany()
        await User.deleteMany()
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const user = await User.create({ name,  email, password })
        userId = user.id.toString()

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id.toString()
                
        let item = new Item({ quantity:_quantity, product:productId })
        itemId = item.id.toString()
        user.cart.push(item)
        await user.save()

        let order = new Order({ date:date, customer:userId, items:user.cart})
        orderId = order.id.toString()
        order.items.push(user.cart.items)
        await order.save()
    })

    it('should succeed on correct data', async () => {
        const result = await retrieveAllOrders(userId)
        expect(result).to.exist
        expect(result[0].date).to.deep.equal(date)
        expect(result[0].customer.toString()).to.equal(userId)
    })
    /* User ID */
    it('should fail on wrong user', async () =>{
        userId = '41224d776a326fb40f000001'
        try{
            await retrieveAllOrders(userId)           
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('User does not exist')
        }
    })    
    it('should fail on empty userId', () => {
        userId = ""
        expect(() => retrieveAllOrders(userId)
        ).to.throw('User ID is empty or blank')
    })
    it('should fail on undefined userId', () => {
        userId = undefined
        expect(() =>
        retrieveAllOrders(userId)
        ).to.throw(`User ID with value undefined is not a string`)
    })
    it('should fail on wrong data type for userId', () => {
        userId = false
        expect(() => retrieveAllOrders(userId)
        ).to.throw(`User ID with value false is not a string`)
    })

    after(() => database.disconnect())
})