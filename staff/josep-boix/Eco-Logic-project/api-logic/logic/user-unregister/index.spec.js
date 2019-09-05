const { expect } = require('chai')
const logic = require('..')
const { database, model: { User } } = require('datamodel')

describe ('logic unregister user', () => {
    before(() => database.connect('mongodb://localhost/api-test', { useNewUrlParser: true }))

    let name, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        
    })
})