const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { userId } = req

    try {
        const orderId = await logic.listOrders(userId)
        res.status(201).json({ message: 'Orders listed successfully', orderId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}