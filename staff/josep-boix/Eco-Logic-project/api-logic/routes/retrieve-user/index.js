const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId } = req

    try {
        const user = await logic.retrieveUser(userId)
        res.json({ message: 'Retrieve success', user })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}