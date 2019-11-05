import { validate } from "@babel/types"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves data from User
 * 
 * @param {String} userId
 * 
 * @throws {Error} if any doesn't go rigth
 * 
 * @returns {Promise}
 */

export default function(userId) {
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
        else {
            const { user } = await response.json()
            return user
        }

    
        
    })()
}