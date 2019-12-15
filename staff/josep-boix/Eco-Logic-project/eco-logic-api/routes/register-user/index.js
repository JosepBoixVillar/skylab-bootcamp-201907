const logic = require('../../logic')

async function registerUser(request, response) {
    const { body: { name, email, password } } = request

    try {
        await logic.registerUser(name, email, password)
        response.status(201).json({ message: 'Register success' })
    } catch ({ message }) {
        response.status(400).json({ error: message })
    }
}
module.exports = registerUser