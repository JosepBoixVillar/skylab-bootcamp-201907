const { expect } = require ('chai')
const logic = require ('./')
const mongoose = require ('mongoose')
const { User } = require ('datamodel')

describe ('logic - register user', () => {

    before(() => mongoose.connect('mongodb://localhost/api-test', { useNewUrlParser:true }))

    let name, email, password

    beforeEach (() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
    })

    it ('should succeed on correct data', async () => {
        const result = await logic.register(name, email, password)
            expect(result).not.to.exist
        const user = await User.findOne({ email, password })
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)
    })
    it ('should fail if user alrady exists', async () => {
        await User.create({ name, email, password })

        try {
            await logic.register(name, email, password)
                // expect(result).to.exist
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('User already exists.')
        }
    })
})