// require('dotenv').config()

// const { expect } = require('chai')
// const unregisterProduct = require('.')
// const { database, models: { User, Item, Product } } = require('datamodel')

// const { env: { DB_URL_TEST } } = process

// describe ('logic - unregister item', () => {
//     before(() => database.connect(DB_URL_TEST))

//     let name, email, password
//     let title, categorie, image, price, description
//     let userId, productId
    
//     beforeEach(async () => {
//         await User.deleteMany()
//         // await Item.deleteMany()
        
//         name = `name-${Math.random()}`
//         email = `email-${Math.random()}@domain.com`
//         password = `password-${Math.random()}`
        
//         title = `title-${Math.random()}`
//         categorie = `categorie-${Math.random()}`
//         image = `image-${Math.random()}`
//         price = Math.random()
//         description = `description-${Math.random()}`
        
//         let quantity = Number((Math.random()*1000).toFixed())

//         const newUser = await User.create ({ name, email, password })
//         userId = newUser._id.toString() 
//         const newProduct = await Product.create({ title, categorie, image, price, description })
//         productId = newProduct._id.toString()
//         const newItem = await Item.create({ product:productId, quantity })
//         // itemId = newItem._id.toString()

//         newUser.cart.push(newItem)

//         await newUser.save()
//     })

//     it('should succeed on correct data', async () => {
//         await unregisterProduct(userId, productId)
//         const user = await User.findById(userId)
//         expect(user.cart[0]).to.not.exist
//     })
//     /* User id */
//     it('should fail on empty user id', () => {
//         userId = ""
//         expect(() => unregisterProduct(userId)
//     ).to.throw('userId is empty or blank')
//     })
//     it('should fail on undefined user id', () => {
//         userId = undefined
//         expect(() => unregisterProduct(userId)
//     ).to.throw(`userId with value undefined is not a string`)
//     })
//     it('should fail on not valid data type for id', () => {
//         userId = false
//         expect(() => unregisterProduct(userId)
//         ).to.throw(Error, 'userId with value false is not a string')
//     })
//     it('should fail on unexisting registered product', async () => {
//         productId = '41224d776a326fb40f000001'

//         try {
//             await unregisterProduct(userId, productId)
//         } catch(error) {
//             expect(error).to.exist
//             expect(error.message).to.equal(`Item with productId ${productId} not found.`)
//         }
//     })

//     after(() => database.disconnect())
// }) 