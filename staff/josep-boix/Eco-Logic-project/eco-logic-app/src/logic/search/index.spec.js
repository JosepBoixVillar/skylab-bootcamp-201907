import searchProducts from '.'

const { database, models: { User, Product } } = require ('datamodel')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

fdescribe ('logic - search', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password
    let title, categorie, image, price, description
    let query

    beforeEach(async () => {

        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `img-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        let userId = user.id

        await Product.deleteMany()

        let product = await Product.create({ title, categorie, image, price, description })
        let productId = product.id

        await product.save()

    })
    
    //happy-path
    it('should succeed on correct data', async () => { debugger
        query = title

        const product = await searchProducts(query)
            expect(product).toBeDefined()
            expect(product['message']).toBe('Product found and available')
            expect(product['product'][0].title).toBe(title)
            expect(product['product'][0].categorie).toBe(categorie)
            expect(product['product'][0].image).toBe(image)
            expect(product['product'][0].description).toBe(description)
            expect(product['product'][0].price).toBe(price)
    })
    
    //error-path
    it('should fail if query does not exist', async () => { debugger
        query = 'not_existing'

        const product = await searchProducts(query)
            expect(product).toBeDefined()
            expect(product['message']).toBe('Product found and available')
    })

    afterAll(() =>  Promise.all([User.deleteMany(), Product.deleteMany()])
        .then (() => database.disconnect()))
    
})