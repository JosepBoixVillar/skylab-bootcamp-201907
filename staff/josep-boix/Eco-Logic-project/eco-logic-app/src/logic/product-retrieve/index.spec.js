import retrieveProduct from '.'

const { database, models: { User, Product } } = require('datamodel')
const { env: { REACT_APP_DB_URL_TEST } } = process

describe.only ('logic - retrieve product', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    // let name, email, password, id
    let title, categorie, image, price, description, productId

    beforeEach(async () => {
        // name = `name-${Math.random()}`
        // email = `email-${Math.random()}@domain.com`
        // password = `password-${Math.random()}`

        // await User.deleteMany()
        // const user = await User.create({ name, email, password })
        // id = user.id

        title = `title-${Math.random()}`
        categorie = `Categorie-${Math.random()}`
        image = `image-${Math.random()}@domain.com`
        price = Math.random()
        description = `description-${Math.random()}@domain.com`

        await Product.deleteMany()
        const product = await Product.create({ title, categorie, image, price, description })
        productId = product._id

    })

    /* Product */
    it ('should succeed on happy path', async () => {
        const product = await retrieveProduct(productId)
            expect(product).toBeUndefined()
            expect(product.id).toBeDefined()
            expect(product.title).toBe(title)
            expect(product.categorie).toBe(categorie)
            // expect(product._id).not.to.exist
            // expect(product.password).not.to.exist
    })
    // it ('should fail on empty id', () => { 
    //     id = ''
    //     expect(() => retrieveUser(id)
    //     ).toBe('id is empty or blank')
    // })
    // it ('should fail on not valid type id', () => { 
    //     id = undefined
    //     expect(() => retrieveUser(id)).toThrow('id with value undefined is not a string')
    // })
    // it ('should fail on wrong id', async () => {
    //     id = '41224d776a326fb40f000001'
    //     try {
    //         await retrieveUser(id)
    //         // throw new Error('should not to throw, sth wrong in the logic')
    //     } catch (error) {
    //         expect(error).toBeDefined()
    //         expect(error.message).toBe('User with id 41224d776a326fb40f000001 does not exist.')
    //     }                    
    // })

    afterAll(() => database.disconnect())
})