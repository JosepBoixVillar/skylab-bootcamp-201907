const logic = require('../../logic')

module.exports = async function(req, res) {
    const { body: { id, email, password } } = req

    try {
        await logic.registerUser(id, email, password)
        res.json({ message: 'Unregister succees' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}