const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('datamodel')

describe ('logic update user', () => {
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
        const user = await updateUser(id, { 
            name: 'newName', 
            email: 'new-Email@domain.com',
            password: 'newPassword' })
            expect(user).not.to.exist
        
        const updateUser = await User.findOne({ _id: id })
            expect(updateUser).to.exist
            expect(updateUser.name).to.equal('newName')
            expect(updateUser.email).to.equal('new-email@domain.com')
            expect(updateUser.password).to.equal('newPassword')
    })

    /* id */
    it ('should fail on empty id', () => {
        id = ''
        expect(() => updateUser(id, email, password)
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
            await updateUser(id, { 
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