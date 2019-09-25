const logic = require('../../logic')

module.exports = async function(req, res) {
    const { body: { name, email, password } } = req

    try {
        await logic.registerUser(name, email, password)
        res.status(201).json({ message: 'Register succees' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}