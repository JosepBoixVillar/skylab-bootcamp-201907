const { expect } = require('chai')
const registerProduct = require('.')
const { database, models: { Product } } = require('datamodel')

describe.only ('logic - register product', () => {
    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser:true }))

    let name, image, price, description

    beforeEach(() => {
        name = `prodName-${Math.random()}`
        image = `prodImg-${Math.random()}`
        price = Math.random()
        description = `prodDescription-${Math.random()}`

        return Product.deleteMany()
    })

    it('should succeed on correct data', async () => {
        debugger
        const productId = await registerProduct(name, image, price, description)
        expect(productId).to.exist
        const result = await Product.findOne({ _id:productId })
        expext(result).to.exist
        // expect(product.name).to.equal(name)
        // expect(product.image).to.equal(image)
        // expect(product.price).to.equal(price)
        // expect(product.description).to.equal(description)
    })
    after(() => database.disconnect())
})