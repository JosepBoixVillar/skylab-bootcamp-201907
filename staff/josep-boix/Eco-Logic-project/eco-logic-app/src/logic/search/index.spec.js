import search from '.'

const { database, models: { User, Product } } = require ('datamodel')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

const { random } = Math

describe('logic - search', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, userId
    let title1, image1, description1, price1
    let title2, image2, description2, price2
    let query

    beforeEach(async () => {

        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`


        title1 = `Title-${random()}`
        image1 = `img-${random()}`
        description1 = `description-${random()}`
        price1 = `price-${random()}`
        location1 = `location-${random()}`
        date1 = new Date()

        title2 = `Title-${random()}`
        image2 = `img-${random()}`
        description2 = `description-${random()}`
        price2 = `price-${random()}`
        location2 = `location-${random()}`
        date2 = new Date()

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password,  merchant_owner: merchant  })
        userId = user.id

        await Advertisement.deleteMany()
        
        const ad1 = await Advertisement.create({ image: image1, title: title1, description: description1, price: price1, location: location1, 'owner': userId,  merchant_owner: merchant  })
        adId1 = ad1.id
        const ad2 = await Advertisement.create({ image: image2, title: title2, description: description2, price: price2, location: location2, 'owner': userId,  merchant_owner: merchant  })
        adId2 = ad2.id

    })
    it('should succeed on correct data', async () => {
        query = "Title"

        const ad = await search(query, domain)
            expect(ad[0]).toBeDefined()
            expect(ad[0].image).toBe(image1)
            expect(ad[0].title).toBe(title1)
            expect(ad[0].description).toBe(description1)
            expect(ad[0].price).toBe(price1)
            expect(ad[0].location).toBe(location1)

            expect(ad[1]).toBeDefined()
            expect(ad[1].image).toBe(image2)
            expect(ad[1].title).toBe(title2)
            expect(ad[1].description).toBe(description2)
            expect(ad[1].price).toBe(price2)
            expect(ad[1].location).toBe(location2)
    })

    afterAll(() => database.disconnect())
})