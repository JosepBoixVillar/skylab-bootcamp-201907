const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId } = req
    try {
        const cards = await logic.retrieveAllCards(userId)
        debugger
        res.status(201).json({ message: 'Retrieve all success', cards })
    } catch ({ message }){
        res.status(404).json({ error: message })
    }
}   