const logic = require('../../logic')

module.exports = async (req, res) => {
    const { params: { query } } = req
    debugger
    try {
        
        const product = await logic.searchProduct(query)
        res.json({ message: 'Product found and available', product })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}