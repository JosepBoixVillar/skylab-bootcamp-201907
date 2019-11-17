const logic = require('../../logic')

async function retrieveProducts (req, res) {
    const { productId } = req.params

    try {
        const product = await logic.retrieveProduct(productId)
        res.json({ message: 'product retrieved correctly', product })
    }catch({ message }){
        res.status(404).json({ error:message })
    }
}
module.exports = retrieveProducts