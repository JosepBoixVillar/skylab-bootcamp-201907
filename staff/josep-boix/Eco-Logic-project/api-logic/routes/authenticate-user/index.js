const logic = require('../../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

async function authenticateUser(request, response) {
    const { body: { email, password } } = request
    
    try {
        const userId = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub:userId }, JWT_SECRET)

        response.json({ message: 'Authentication had succeed', token })
    } catch ({ message }) {
        response.status(401).json({ error: message })
    }
}
module.exports = authenticateUser