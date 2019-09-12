const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId, body: { email, password } } = req
    try {
        await logic.unregisterUser(userId, email, password)
        res.json({ message: 'Unregister succees' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}