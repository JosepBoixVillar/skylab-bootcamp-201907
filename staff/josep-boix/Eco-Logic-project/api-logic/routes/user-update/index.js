const logic = require('../../logic')

module.exports = async function(req, res) {
    const { body, params: { id } } = req

    try {
        await logic.registerUser(id, body)
        res.json({ message: 'Update succees' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}