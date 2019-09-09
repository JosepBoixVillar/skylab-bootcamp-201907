const logic = require('../../logic')

module.exports = async function(req, res) {
    const { body: { id } } = req

    try {
        await logic.retrieveUser(id)
            res.status(201).json({ message: 'Retrieve succees', user })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}