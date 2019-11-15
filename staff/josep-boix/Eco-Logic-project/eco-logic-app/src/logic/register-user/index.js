import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Register an User by params
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * 
 * @throws {Error} if any doesn't go right
 * 
 * @returns {Promise}
 */

function registerUser(name, email, password) {

    validate.string(name, 'name')
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return(async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'POST',
            headers: { 'content-type':'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        if(response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()

}

export default registerUser