const express = require('express')
const tokenMiddleware = require('../middleware')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()
const router = express.Router()

const registerUser = require('./user-register')
const authenticateUser = require('./user-authenticate')
const unregisterUser = require('./user-unregister')
const retrieveUser = require('./user-retireve')
const updateUser = require('./user-update')

const registerCard = require('./card-register')
const unregisterCard = require('./card-unregister') 
const retrieveCard = require('./card-retrieve')
const retrieveAllCards = require('./card-retrieveAll')

const registerProduct = require('./product-register')
// const unregisterProduct = require('./product-unregister')
// const retrieveProduct = require('./product-retrieve')


/* user */
router.post('/users',jsonBodyParser, registerUser)
router.post('/users/auth',jsonBodyParser, authenticateUser)
router.delete('/user',[tokenMiddleware, jsonBodyParser], unregisterUser)
router.get('/user',[tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/user',[tokenMiddleware, jsonBodyParser], updateUser)

/* card */
router.post('/user/card',[tokenMiddleware, jsonBodyParser], registerCard)
router.delete('/user/card/:cardId', [tokenMiddleware, jsonBodyParser], unregisterCard)
router.get('/user/card/:cardId', [tokenMiddleware, jsonBodyParser], retrieveCard)
router.get('/user/cards', [tokenMiddleware, jsonBodyParser], retrieveAllCards)

/* product */
router.post('/user/product',[tokenMiddleware, jsonBodyParser], registerProduct)

module.exports = router