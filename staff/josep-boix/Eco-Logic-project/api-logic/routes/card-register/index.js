const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId, 
        body: { identifier, expiry, ccv, currency } } = req

    try {
        const cardId = await logic.registerCard(userId, identifier, expiry, ccv, currency)
        res.status(201).json({ message: 'Card register success.', id: cardId })
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}