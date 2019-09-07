const { expect } = require('chai')
const logic = require('..')
const { database, models: { User } } = require('datamodel')

describe.only ('logic update user', () => {
    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParse: true }))

    beforeEach(async () => {
        await User.deleteMany()
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        const user = await User.create({ name, email, password })
        id = user.id
    })
    
    let name, email, password, id

    it ('should succees on correct data', async () => {
        debugger
        const user = await logic.update(id, { 
            name: 'updateName', 
            email: 'updateEmail@domain.com',
            password: 'updatePassword' })
            expect(user).not.to.exist
        
        const updateUser = await User.findOne({ _id: id })
            expect(updateUser).to.exist
            expect(updateUser.name).to.equal('updateName')
            expect(updateUser.email).to.equal('updateEmail@domain.com')
            expect(updateUser.password).to.equal('updatePassword')
    })

    /* id */
    it ('should fail on empty id', () => {
        id = ''
        expect(() => logic.update(id, email, password)
        ).to.throw(Error, 'id is empty or blank')
    })
    it ('should fail on not valid type id', () => {
        id = undefined
        expect(() => logic.unregister(id, email, password)
        ).to.throw(Error, 'id with value undefined is not a string')
    })
    it ('should fail on not valid data type for id', () => {
        id = false
        expect(() => logic.unregister(id, email, password)
        ).to.throw(Error, 'id with value false is not a string')
    })
    it ('should fail on uncorrect id', async () => {
        id = '41224d776a326fb40f000001'
        try {
            await logic.update(id, { 
                name: 'updateName', 
                email: 'updateEmail@domain.com',
                password: 'updatePassword' })
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('There was an error updating the user')
        }
    })

    after(() => database.disconnect())
})