//routes logic api
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
const retrieveAllCards = require('./card-retrieve-all')

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
/* item */
router.post('/user/item',[tokenMiddleware, jsonBodyParser], registerItem)
router.delete('/user/item/:productId', [tokenMiddleware, jsonBodyParser], unregisterItem)

/* order */
router.post('/user/orders',[tokenMiddleware, jsonBodyParser], registerOrder)
router.get('/user/orders', [tokenMiddleware, jsonBodyParser], listOrders)
router.get('/user/allorders/', [tokenMiddleware, jsonBodyParser], retrieveAllOrders)

/* cart */
router.post('/user/cart',[tokenMiddleware, jsonBodyParser], addToCart)
router.patch('/user/cart/deleteItem',[tokenMiddleware, jsonBodyParser], removeProduct)
router.get('/user/cart',[tokenMiddleware, jsonBodyParser], listCart)

module.exports = router