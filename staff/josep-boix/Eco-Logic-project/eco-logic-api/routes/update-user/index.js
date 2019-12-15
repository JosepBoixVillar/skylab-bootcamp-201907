const logic = require('../../logic')

async function updateUser(request, response) {
    
    const { userId, body } = request
    try {
        await logic.updateUser(userId, body)
        response.json({ message: 'Update success' })
    } catch ({ message }) {
        response.status(404).json({ error: message })
    }

}
module.exports = updateUser