const logic = require('../../logic')

async function unregisterUser(request, response) {
    
    const { userId, body: { email, password } } = request

    try {
        await logic.unregisterUser(userId, email, password)
        response.json({ message: 'Unregister succeed' })
    } catch ({ message }) {
        response.status(404).json({ error: message })
    }
    
}
module.exports = unregisterUser