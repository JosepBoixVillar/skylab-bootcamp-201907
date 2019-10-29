require('dotenv').config() 

const { expect } = require('chai')
const retrieveProduct = require('.')
const { database, models:{ User, Product, Item, Order } } = require('datamodel')

const { env: { DB_URL_TEST } } = process 

describe ('logic - retrieve order', () => {
    before(() => database.connect(DB_URL_TEST)) 
    
    let name, email, password, userId, user
    let title, image, price, description, productId
    let _quantity, date
    let orderId
    

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
        productId = product.id.toString()
        
        let item = new Item({ product:productId, quantity:_quantity })
        itemId = item.id
        user.cart.push(item)
        await user.save()

        let order = new Order({ date:date, customer:userId, items:user.cart })
        orderId = order.id
        order.items.push(user.cart.items)
        await order.save()
            
    })

    it('should succeed on correct data', async () =>{
        const result = await retrieveProduct(productId)
        expect(result).to.exist
        // expect(result[0].date).to.deep.equal(date)
        // expect(result[0].customer.toString()).to.equal(userId)
    }) 
    /* userID */
    it('should fail on wrong user',async () =>{
        userId = '41224d776a326fb40f000001'
        try{
            await retrieveProduct(productId)     
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('User with id 41224d776a326fb40f000001 does not exist')
        }
    }) 
    
    /* product ID */
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => retrieveProduct(productId)
        ).to.throw('id is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => retrieveProduct(productId)
        ).to.throw(`id with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => retrieveProduct(productId)
        ).to.throw(`id with value false is not a string`)
    })

    after(() => database.disconnect())
})