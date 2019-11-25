//routes logic api
const express = require('express')
const tokenMiddleware = require('../middleware')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()
const router = express.Router()

const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const unregisterUser = require('./unregister-user')
const retrieveUser = require('./retrieve-user')
const updateUser = require('./update-user')

const registerCard = require('./card-register')
const unregisterCard = require('./card-unregister') 
const retrieveCard = require('./card-retrieve')
const retrieveAllCards = require('./card-retrieve-all')

const searchProduct = require('./search')
const retrieveProducts = require('./retrieve-product')

// const unregisterProduct = require('./product-unregister')
// const retrieveProduct = require('./product-retrieve')

const placeOrder = require('./place-order')
const retrieveOrders = require('./retrieve-order')

// const retrieveAllOrders = require('./order-retrieveAll')

const addToCart = require('./cart-addToCart')
const listToCart = require('./cart-list')
const cartRemove = require('./cart-remove')

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
router.get('/user/search/:query', jsonBodyParser, searchProduct)
router.get('/user/detail/:productId', jsonBodyParser, retrieveProducts)

/* item */
// router.post('/user/item',[tokenMiddleware, jsonBodyParser], registerItem)
// router.delete('/user/item/:productId', [tokenMiddleware, jsonBodyParser], unregisterItem)

/* order */
router.post('/user/orders', [tokenMiddleware, jsonBodyParser], placeOrder)
router.get('/user/orders/list', [tokenMiddleware, jsonBodyParser], retrieveOrders)

// router.get('/user/allorders/', [tokenMiddleware, jsonBodyParser], retrieveAllOrders)

/* cart */
router.post('/user/cart', [tokenMiddleware, jsonBodyParser], addToCart)
router.get('/user/cart/list', [tokenMiddleware, jsonBodyParser], listToCart)
router.patch('/user/cart/delete', [tokenMiddleware, jsonBodyParser], cartRemove)

module.exports = router