const logic = require('../../logic')

module.exports = async(req, res)=> {
    debugger
    const { userId, body: { productId } } = req

    try { 
        const orderId = await logic.cartRemove(userId, productId)
        res.status(201).json({ message: 'Item unregistered successfully', orderId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}