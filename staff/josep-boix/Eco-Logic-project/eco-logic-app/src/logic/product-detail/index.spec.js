import logic from '..'
import { database, models } from 'datamodel'

const { Product } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST 

describe ('logic - retrieve product detail', () => {

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST)) 
    
    let title, categorie, image, price, description, productId

    beforeEach(async() => {
        await Product.deleteMany()

        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id
    })

    //happy-path
    it('should succeed on correct data', async () =>{ debugger
        const result = await logic.retrieveProduct(productId)
        expect(result).toBeDefined()
        expect(result.title).toBe(title)
        expect(result.categorie).toBe(categorie)
        expect(result.image).toBe(image)
        expect(result.price).toBe(price)
        expect(result.description).toBe(description)
    }) 
        
    //error-path
    it('should fail on empty productId', () => {
        productId = ""
        expect(() => logic.retrieveProduct(productId)
        ).toThrow('productId is empty or blank')
    })
    it('should fail on undefined productId', () => {
        productId = undefined
        expect(() => logic.retrieveProduct(productId)
        ).toThrow(`productId with value undefined is not a string`)
    })
    it('should fail on wrong data type for productId', () => {
        productId = false
        expect(() => logic.retrieveProduct(productId)
        ).toThrow(`productId with value false is not a string`)
    })
    it ('should fail on wrong productId', async () => {
        productId = '41224d776a326fb40f000001'
        try {
            await logic.retrieveProduct(productId)
            // throw new Error('should not to throw, sth wrong in the logic')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('product 41224d776a326fb40f000001 not found')
        }                    
    })

    afterAll(() => database.disconnect())

})