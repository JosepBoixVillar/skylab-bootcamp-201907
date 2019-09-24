const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId, params: { cardId } } = req

    try{
        const card = await logic.retrieveCard(userId, cardId)
        res.status(201).json({ message: 'Retrieve success', card })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}