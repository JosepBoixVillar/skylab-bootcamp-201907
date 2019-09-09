const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (request, response, next) => {
    try {
        const { headers: { authorization } } = req
        if (!authorization) throw new Error('no authorization token received')
        
        const token = authorization.slice(authorization.indexOf(' ') + 1)

        const { sub } = jwt.verify(token, JWT_SECRET)
        request.userId = sub

        // const { params: { id } , headers: { authorization } } = request
        // if(!authorization) throw Error('Token recived is not valid.')

        // const token = authorization.slice(authorization.indexOf(' ')+1)

        // const { sub } = jwt.verify(token, JWT_SECRET)
        // if(sub !== id) throw Error(`Token not valid for id ${id}`)

        next()
    } catch ({ message }) {
        response.status(401).json({ error: message })
    }
}