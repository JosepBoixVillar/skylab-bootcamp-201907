import logic from '..'
import { database, models } from 'datamodel'

const { Product } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST 

describe ('logic - retrieve order', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST)) 
    
    // let name, email, password, userId, user
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

    it('should succeed on correct data', async () =>{
        const result = await logic.retrieveProduct(productId)
        expect(result).toBeDefined()
        expect(result.title).toBe(title)
        expect(result.categorie).toBe(categorie)
        expect(result.image).toBe(image)
        expect(result.price).toBe(price)
        expect(result.description).toBe(description)
    }) 
        
    /* product ID */
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

    afterAll(() => database.disconnect())
})