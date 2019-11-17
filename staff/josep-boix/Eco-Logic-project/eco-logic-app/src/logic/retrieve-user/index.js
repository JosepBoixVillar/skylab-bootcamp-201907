import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves data from user by user-id
 * 
 * @param {String} userId
 * 
 * @throws {Error} if any doesn't go rigth
 * 
 * @returns {Promise}
 */

function retrieveUser(userId) {

    validate.toString(userId, 'User Id')    

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user`, {
            method: 'GET',
            headers: { 'authorization': `bearer ${this.__token__}` }
        })

        if(response.status !== 200) {
            const { error } = await response.json()
            throw new Error(error)
        }
        
        const { user } = await response.json()

        return user
    })()

}

export default retrieveUser