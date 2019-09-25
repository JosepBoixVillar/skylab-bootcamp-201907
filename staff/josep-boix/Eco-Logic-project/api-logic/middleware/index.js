const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (request, response, next) => {
    try {
        const { headers: { authorization } } = request
        if(!authorization) throw Error('Token recived is not valid.')

        const token = authorization.slice(authorization.indexOf(' ')+1)

        const { sub } = jwt.verify(token, JWT_SECRET)
        request.userId = sub

        next()
    } catch ({ message }) {
        response.status(401).json({ error: message })
    }
}

