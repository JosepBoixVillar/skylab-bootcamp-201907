const logic = require('../../logic')

module.exports = async(req, res)=> {
debugger
    const { body: { productId, quantity }, userId } = req

    try { 
        const orderId = await logic.addToCart(userId, quantity, productId )
        res.status(201).json({ message: 'Order registered successfully', orderId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}