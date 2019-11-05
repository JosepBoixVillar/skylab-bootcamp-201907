import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Authenticate an User by params
 * 
 * @param {String} email 
 * @param {String} password 
 * 
 * @throws {Error} if any doesn't go right
 * 
 * @returns {Promise}
 */

function authenticateUser(email, password) {
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return(async () => { debugger
        const response = await fetch(`${REACT_APP_API_URL}/users/auth`,{
            method: 'POST',
            headers: { 'content-type':'application/json'},
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            const { token } = await response.json()
            this.__token__ = token

            return
        }

        const { error } = await response.json()
        throw Error(error)
    })()
}
export default authenticateUser