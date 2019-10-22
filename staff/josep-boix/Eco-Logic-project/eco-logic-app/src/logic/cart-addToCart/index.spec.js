// import logic from '../'
// // import bcrypt from 'bcryptjs'
// // import jwt from 'jsonwebtoken'

// const  { database, models: { User, Product } } = require('datamodel')
// const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

// describe.only('logic - add to cart', () => {
//     beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

//     let name, email, password, userId
//     let title, categorie, image, price, description, productId
//     let _quantity
    
//     beforeEach(async() => {

//         _quantity = Number((Math.random()*1000).toFixed())
//         date = new Date()

//         await User.deleteMany()
//             name = `name-${Math.random()}`
//             email = `email-${Math.random()}@domain.com`
//             password = `password-${Math.random()}`
            
//             title = `title-${Math.random()}`
//             categorie = `categorie-${Math.random()}`
//             image = `image-${Math.random()}`
//             price = Math.random()
//             description = `description-${Math.random()}`

//             const user = await User.create({ name, email, password })
//             userId = user.id

//             const product = await Product.create({ title, categorie, image, price, description })
//             productId = product.id 
//     })

//     it('should succeed on correct data',async () =>{
//         debugger
//         await logic.addToCart(userId,productId,quantity1)
              
//         const user = await User.findById(userId)
//         expect(user).toBeDefined
//         expect(user.cart).toBeDefined
//         expect(user.cart[0].quantity).toBe(_quantity)

//     })
    
// })
