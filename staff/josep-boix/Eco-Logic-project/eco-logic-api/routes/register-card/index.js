const logic = require('../../logic')

async function registerCard(req, res) {
    const { userId, 
        body: { identifier, expiry, ccv, currency } } = req

    try {
        const cardId = await logic.registerCard(userId, identifier, expiry, ccv, currency)
        res.status(201).json({ message: 'Card register success.', id: cardId })
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}
module.exports = registerCard