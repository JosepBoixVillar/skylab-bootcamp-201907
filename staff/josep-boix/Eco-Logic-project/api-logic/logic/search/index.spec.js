require('dotenv').config()

const { expect } = require('chai')
const searchProduct = require('.')
const { database, models: { Product } } = require('datamodel')

const { env: { DB_URL_TEST }} = process

describe.only ('logic - search ads', () => {
    before(() => database.connect(DB_URL_TEST))

    let title, categorie, image, price, description

    let query

    beforeEach(() => {

        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        return (async () => {
            await Product.deleteMany()
            let newProduct = await new Product({ title, categorie, image, price, description })
            productId = newProduct.id
            await newProduct.save()
        })()
    })

    it('should succeed on correct data', async () => {
        query = title

        const product = await searchProduct(query)
        expect(product).to.exist
        
        expect(product[0].title).to.equal(title)
        expect(product[0].categorie).to.deep.equal(categorie)        
        expect(product[0].image).to.deep.equal(image)

    })
 
    it('should fail if product does not exist', async () => {
        query = undefined
        try {
            await searchProduct(query)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`query with value ${query} is not a string`)
        }
    })
    it('should fail if product does not exist', async () => {
        query = 'title'
        try {
            await searchProduct(query)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`there are not products with query ${query}`)
        }
    })

    after(() => database.disconnect())
})