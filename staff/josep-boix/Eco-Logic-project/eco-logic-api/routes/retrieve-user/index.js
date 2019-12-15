const logic = require('../../logic')

async function retrieveUser(request, response) {

    const { userId } = request
    try {
        const user = await logic.retrieveUser(userId)
        response.json({ message: 'Retrieved with succeed', user })
    } catch ({ message }) {
        response.status(404).json({ error: message })
    }

}
module.exports = retrieveUser