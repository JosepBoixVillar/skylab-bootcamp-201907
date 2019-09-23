require('dotenv').config()

const { expect } = require('chai')
const { database, models: { Item, Product } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

const unregister = require('.')

describe('logic - unregister item', () => {

    before(() => database.connect(DB_URL_TEST))

    let id, itemId

    beforeEach(async() => {
        quantity = Number((Math.random()*1000).toFixed())

        await Item.deleteMany()
            
        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        price = Math.random()
        description = `description-${Math.random()}`

        const product=await Product.create({ title, image, price, description })
        id = product._id.toString()   
    })

    it('should succeed on correct data',async () =>{
        const result= await unregister(id)
        expect(result).not.to.exist
    })

    it('should fail on empty id', () => 
        expect(() => unregister("")
    ).to.throw('id is empty or blank'))

    it('should fail on undefined id', () => 
        expect(() => unregister(undefined)
    ).to.throw(`id with value undefined is not a string`))

    after(() => database.disconnect())
}) 