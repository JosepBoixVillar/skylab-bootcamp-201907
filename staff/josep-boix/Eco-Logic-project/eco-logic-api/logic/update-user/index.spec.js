require ('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('datamodel')

const { env: { DB_URL_TEST } } = process

describe ('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, email, password, userId

    beforeEach(async () => {
        await User.deleteMany()
        
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        const user = await User.create({ name, email, password })
        userId = user.id
    })
    
    //happy-path
    it ('should succeed on correct data', async () => {
        const user = await updateUser(userId, { 
        name: 'newName', 
        email: 'new-email@domain.com',
        password: 'newPassword' })
        expect(user).not.to.exist
        
        const updatedUser = await User.findOne({ _id: userId })
        expect(updatedUser).to.exist
        expect(updatedUser.name).to.equal('newName')
        expect(updatedUser.email).to.equal('new-email@domain.com')
        expect(updatedUser.password).to.equal('newPassword')
    })

    //error-path
    it ('should fail on empty id', () => {
        userId = ''
        expect(() => updateUser(userId, email, password)
            ).to.throw(Error, 'User ID is empty or blank')
    })
    it ('should fail on not valid type id', () => {
        userId = undefined
        expect(() => updateUser(userId, email, password)
        ).to.throw(Error, 'User ID with value undefined is not a string')
    })
    it ('should fail on not valid data type for id', () => {
        userId = false
        expect(() => updateUser(userId, email, password)
        ).to.throw(Error, 'User ID with value false is not a string')
    })
    it ('should fail on uncorrect id', async () => {
        userId = '41224d776a326fb40f000001'
        try {
            await updateUser(userId, { 
                name: 'updateName', 
                email: 'updateEmail@domain.com',
                password: 'updatePassword' })
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('User id 41224d776a326fb40f000001 does not exist.')
        }
    })

    after(() => Promise.all([User.deleteMany()])
        .then (() => database.disconnect()))
})