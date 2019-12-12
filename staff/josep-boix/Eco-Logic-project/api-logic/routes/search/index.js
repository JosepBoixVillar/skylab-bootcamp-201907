const logic = require('../../logic')

async function searchProduct(req, res) {
    const { params: { query } } = req

    try {
        
        const product = await logic.searchProduct(query)
        res.json({ message: 'Product found and available', product })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
module.exports = searchProduct