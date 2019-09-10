const logic = require('../../logic')

module.exports = async function(req, res) {
    const { userId } = req

    try {
        const user = await logic.retrieveUser(userId)
        res.status(201).json({ message: 'Retrieve succees', user })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}