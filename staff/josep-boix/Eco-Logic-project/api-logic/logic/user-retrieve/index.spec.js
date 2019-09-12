const { expect } = require('chai')
const logic = require('..')
const { database, models: { User } } = require('datamodel')

describe ('logic - retrieve user', () => {
    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser: true }))

    let name, email, password, id
    beforeEach(async () => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, email, password })
        id = user.id
    })

    /* id */
    it ('should succees on correct id', async () => {
        const user = await logic.retrieve(id)
            expect(user).to.exist
            expect(user.id).to.exist
            expect(user.name).to.equal(name)
            expect(user.email).to.equal(email)
            expect(user._id).not.to.exist
            expect(user.password).not.to.exist
    })
    it ('should fail on empty id', () => { 
        id = ''
        expect(() => 
            logic.retrieve(id)
        ).to.throw(Error, 'id is empty or blank')
    })
    it ('should fail on not valid type id', () => { 
        id = undefined
        expect(() => 
            logic.retrieve(id)
        ).to.throw(Error, 'id with value undefined is not a string')
    })
    it ('should fail on uncorrect id', async () => {
        id = '41224d776a326fb40f000001'
        try {
            await logic.retrieve(id)
            // throw new Error('should not to throw, sth wrong in the logic')
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User with id 41224d776a326fb40f000001 does not exist.')
        }                    
    })

    after(() => database.disconnect())
})