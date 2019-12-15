const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { userId } = req

    try { 
        const cart = await logic.listToCart(userId)
        res.status(201).json({ message: 'Cart retrieved successfully', cart})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}