require ('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic update user', () => {
    before(() => database.connect(DB_URL_TEST))

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
        const user = await updateUser(id, { 
            name: 'newName', 
            email: 'new-email@domain.com',
            password: 'newPassword' })
            expect(user).not.to.exist
        
        const updatedUser = await User.findOne({ _id: id })
            expect(updatedUser).to.exist
            expect(updatedUser.name).to.equal('newName')
            expect(updatedUser.email).to.equal('new-email@domain.com')
            expect(updatedUser.password).to.equal('newPassword')
    })

    /* id */
    it ('should fail on empty id', () => {
        id = ''
        expect(() => updateUser(id, email, password)
        ).to.throw(Error, 'id is empty or blank')
    })
    it ('should fail on not valid type id', () => {
        id = undefined
        expect(() => updateUser(id, email, password)
        ).to.throw(Error, 'id with value undefined is not a string')
    })
    it ('should fail on not valid data type for id', () => {
        id = false
        expect(() => updateUser(id, email, password)
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
            expect(error.message).to.equal('User id 41224d776a326fb40f000001 does not exist.')
        }
    })

    after(() => database.disconnect())
})