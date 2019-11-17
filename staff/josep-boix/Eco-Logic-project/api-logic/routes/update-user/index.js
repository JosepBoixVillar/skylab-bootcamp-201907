const logic = require('../../logic')

module.exports = async function(req, res) {
    const { body, userId } = req

    try {
        await logic.updateUser(userId, body)
        res.json({ message: 'Update succees' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}