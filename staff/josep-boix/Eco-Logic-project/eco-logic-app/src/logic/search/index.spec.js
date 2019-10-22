import searchProducts from '.'

const { database, models: { User, Product } } = require ('datamodel')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe ('logic - search', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, email, password, userId
    let title, categorie, image, price, description, productId
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
        userId = user.id

        await Product.deleteMany()
        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id
    })
    it('should succeed on correct data', async () => {
        query = title

        const product = await searchProducts(query)
            expect(product[0]).toBeDefined()
            expect(product[0].title).toBe(title)
            expect(product[0].categorie).toBe(categorie)
            expect(product[0].image).toBe(image)
            expect(product[0].description).toBe(description)
            expect(product[0].price).toBe(price)
    })

    afterAll(() => database.disconnect())
})