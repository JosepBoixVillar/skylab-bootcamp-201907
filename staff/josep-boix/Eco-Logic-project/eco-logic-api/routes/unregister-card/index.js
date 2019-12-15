const logic = require('../../logic')

async function unregisterCard(req, res) {
    const { userId, params: { cardId } } = req

    try {
        await logic.unregisterCard(userId, cardId)
        res.json({ message: 'Card deleted successfully.'})
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
module.exports = unregisterCard

// , body: { password } = req