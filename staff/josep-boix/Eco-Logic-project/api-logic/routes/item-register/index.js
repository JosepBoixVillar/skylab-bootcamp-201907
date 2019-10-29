const logic = require('../../logic')

module.exports = async(req, res) => {
    const { params: { productId }, body: { quantity } } = req
    
    try {
        const itemId = await logic.register(productId,quantity)
        res.status(201).json({ message: 'Item registered successfully', id: itemId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}