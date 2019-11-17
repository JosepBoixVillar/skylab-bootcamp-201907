require('dotenv').config() 

const { expect } = require('chai')
const retrieveProduct = require('.')
const { database, models: { Product } } = require('datamodel')

const { env: { DB_URL_TEST } } = process 

describe ('logic - retrieve product', () => {

    before(() => database.connect(DB_URL_TEST)) 
    
    let title, image, price, description, productId

    beforeEach(async() => {
        title = `title-${Math.random()}`
        categorie = `categorie-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product = await Product.create({ title, categorie, image, price, description })
        productId = product.id.toString()
    })

    //happy-path
    it('should succeed on correct data', async () =>{ debugger
        const result = await retrieveProduct(productId)
        expect(result).to.exist
        expect(result.title).to.deep.equal(title)
        expect(result.categorie).to.deep.equal(categorie)
        expect(result.image).to.deep.equal(image)
        expect(result.price).to.deep.equal(price)
        expect(result.description).to.deep.equal(description)
    }) 

    //error-path
    it('should fail on wrong productId',async () =>{
        productId = '41224d776a326fb40f000001'
        try{
            await retrieveProduct(productId)     
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('product 41224d776a326fb40f000001 not found')
        }
    }) 
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