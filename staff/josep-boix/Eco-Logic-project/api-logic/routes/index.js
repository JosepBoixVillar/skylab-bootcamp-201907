const express = require('express')
const tokenMiddleware = require('../middleware')
const bodyParser = require('body-parser')

const registerUser = require('./user-register')
const authenticateUser = require('./user-authenticate')
const unregisterUser = require('./user-unregister')
const retrieveUser = require('./user-retireve')
const updateUser = require('./user-update')

const jsonBodyParser = bodyParser.json()
const router = express.Router()

/* user */
router.post('/users',jsonBodyParser, registerUser)
router.post('/users/auth',jsonBodyParser, authenticateUser)
router.delete('/user/:id',[tokenMiddleware, jsonBodyParser], unregisterUser)
router.get('/user/:id',[tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/user/:id',[tokenMiddleware, jsonBodyParser], updateUser)


/* card */
// const registerCard = require('./card-register')
// const unregisterCard = require('./card-unregister') 
// const retrieveCard = require('./card-retrieve')
// const retrieveAllCards = require('./card-retrieveAll')

module.exports = router