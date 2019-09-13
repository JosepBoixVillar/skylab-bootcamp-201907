const logic = require('../../logic')

module.exports = async function(req, res) {
    const { body: { name, price, description } } = req

    try {
        await logic.registerProduct(name, price, description)
        res.status(201).json({ message: 'Product registered successfully' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}