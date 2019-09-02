const mongoose = require ('mongoose')
const { Schema } = mongoose

const userSchema = require ('./item')
const itemSchema = require ('./item')

const order = new Schema ({
    id: {
        type: Number
    },
    date: {
        type: Date
    },
    
    user: [userSchema],
    items: [itemSchema]
})
module.exports = order