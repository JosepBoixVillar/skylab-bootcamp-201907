const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId, params: { cardId } } = req
debugger
    try {
        await logic.unregisterCard(userId, cardId)
        res.json({ message: 'Card deleted successfully.'})
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

// , body: { password } = req