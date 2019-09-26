const logic = require('../../logic')

module.exports = async(req, res) => {

    const { body: { productId,quantity }, params: { id } } = req

    try {
        const orderId = await logic.order.placeOrder(id, quantity, productId)
        res.status(201).json({ message: 'Order placed registered successfully', orderId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}