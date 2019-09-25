const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { params: { id } } = req

    try {
        const orderId = await logic.order.listOrders(id)
        res.status(201).json({ message: 'Orders listed successfully', orderId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}