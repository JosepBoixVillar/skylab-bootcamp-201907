const logic = require('../../logic')

module.exports = async(req, res) => {

    const { userId, body: { productId, quantity } } = req

    try {
        const orderId = await logic.registerOrder(userId, productId, quantity)
        res.status(201).json({ message: 'Order placed registered successfully', orderId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}