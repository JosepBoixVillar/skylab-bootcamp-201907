const { Router } = require('express')
const tokenMiddleware = require('../middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, unregisterUser, 
    retrieveUser, updateUser } = require('./user-register')

const { registerCard, unregisterCard, 
    retrieveCard, retrieveAllCards } = require('./card')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* user */

router.post('/users',jsonBodyParser, registerUser)
router.post('/auth',jsonBodyParser, authenticateUser)
router.delete('/user/:id',[tokenMiddleware, jsonBodyParser], unregisterUser)
router.get('/user/:id',[tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/user/:id',[tokenMiddleware, jsonBodyParser], updateUser)