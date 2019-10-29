// require('dotenv').config() 

// const { expect } = require('chai')
// const retrieveOrder = require('.')
// const { database, models:{ User, Product, Item, Order } } = require('datamodel')

// const { env: { DB_URL_TEST } } = process 

// describe ('logic - retrieve order', () => {
//     before(() => database.connect(DB_URL_TEST)) 
    
//     let name, email, password, userId, user
//     let title, image, price, description, productId
//     let _quantity, date
//     let orderId
    

//     beforeEach(async() => {
//         _quantity = Number((Math.random()*1000).toFixed())
//         date = new Date()

//         await User.deleteMany()

//         name = `name-${Math.random()}`
//         email = `email-${Math.random()}@domain.com`
//         password = `password-${Math.random()}`
        
//         title = `title-${Math.random()}`
//         categorie = `categorie-${Math.random()}`
//         image = `image-${Math.random()}`
//         price = Math.random()
//         description = `description-${Math.random()}`

//         const user = await User.create({ name, email, password })
//         userId = user.id

//         const product = await Product.create({ title, categorie, image, price, description })
//         productId = product.id.toString()
        
//         let item = new Item({ product:productId, quantity:_quantity })
//         itemId = item.id
//         user.cart.push(item)
//         await user.save()

//         let order = new Order({ date:date, customer:userId, items:user.cart })
//         orderId = order.id
//         order.items.push(user.cart.items)
//         await order.save()
            
//     })

//     it('should succeed on correct data', async () =>{
//         const result = await retrieveOrder(userId,orderId)
//         expect(result).to.exist
//         expect(result[0].date).to.deep.equal(date)
//         expect(result[0].customer.toString()).to.equal(userId)
//     }) 
//     /* userID */
//     it('should fail on wrong user',async () =>{
//         userId = '41224d776a326fb40f000001'
//         try{
//             await retrieveOrder(userId, orderId)     
//         }catch(error){
//             expect(error).to.exist
//             expect(error.message).to.equal('User with id 41224d776a326fb40f000001 does not exist')
//         }
//     }) 
//     it('should fail on empty userId', () => {
//         userId = ""
//         expect(() => retrieveOrder(userId, orderId)
//         ).to.throw('User ID is empty or blank')
//     })
//     it('should fail on undefined userId', () => {
//         userId = undefined
//         expect(() => retrieveOrder(userId, orderId)
//         ).to.throw(`User ID with value undefined is not a string`)
//     })
//     it('should fail on wrong data type for userId', () => {
//         userId = false
//         expect(() => retrieveOrder(userId, orderId)
//         ).to.throw(`User ID with value false is not a string`)
//     })
//     /* orderID */
//     it('should fail on empty orderId', () => {
//         orderId = ""
//         expect(() => retrieveOrder(userId, orderId)
//         ).to.throw('Order ID is empty or blank')
//     })
//     it('should fail on undefined orderId', () => {
//         orderId = undefined
//         expect(() => retrieveOrder(userId, orderId)
//         ).to.throw(`Order ID with value undefined is not a string`)
//     })
//     it('should fail on wrong data type for orderId', () => {
//         orderId = false
//         expect(() => retrieveOrder(userId, orderId)
//         ).to.throw(`Order ID with value false is not a string`)
//     })

//     after(() => database.disconnect())
// })