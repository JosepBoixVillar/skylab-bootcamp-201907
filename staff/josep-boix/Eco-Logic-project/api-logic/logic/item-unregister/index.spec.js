require('dotenv').config()

const { expect } = require('chai')
const unregisterItem = require('.')
const { database, models: { Item, Product } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic - unregister item', () => {
    before(() => database.connect(DB_URL_TEST))

    let title, image, price, description, id
    
    beforeEach(async () => {
        // let quantity = Number((Math.random()*1000).toFixed())

        await Item.deleteMany()
            
        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product = await Product.create({ title, image, price, description })
        id = product._id.toString()   
    })

    it('should succeed on correct data', async () => {
        const result = await unregisterItem(id)
        expect(result).not.to.exist
    })
    /* id */
    it('should fail on empty id', () => {
        id = ""
        expect(() => unregisterItem(id)
    ).to.throw('id is empty or blank')
    })
    it('should fail on undefined id', () => {
        id = undefined
        expect(() => unregisterItem(id)
    ).to.throw(`id with value undefined is not a string`)
    })
    it('should fail on not valid data type for id', () => {
        id = false
        expect(() => unregisterItem(id)
        ).to.throw(Error, 'id with value false is not a string')
    })
    it('should fail on unexisting registered product', async () => {
        id = '41224d776a326fb40f000001'

        try {
            await unregisterItem(id)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Product with id ${id} does not exist.`)
        }
    })

    after(() => database.disconnect())
}) 