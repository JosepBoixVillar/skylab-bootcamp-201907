const { expect } = require('chai')
const logic = require('..')
const { database, models: { Users } } = require('datamodel')

describe ('logic - register card')
    before(() => database.connect('mongodb://localhost/api-test', { UserNewUrlParser: true}))

    let number, expiry, ccv
    let name, email, password

    