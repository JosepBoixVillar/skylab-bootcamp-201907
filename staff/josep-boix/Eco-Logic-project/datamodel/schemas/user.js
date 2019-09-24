// user schema

const mongoose = require ('mongoose') 
const { Schema } = mongoose
const  cardSchema = require ('./card')
const  itemSchema = require ('./item')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: Array
    },
    isAdmin: {
        type: Boolean
    },

    cart: [itemSchema],
    cards: [cardSchema]
})