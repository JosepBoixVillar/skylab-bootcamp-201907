import validate  from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieve all Cart products by userId
 * 
 * @param {String} userId
 * 
 * @throws {Error} if any doesn't go right
 * 
 * @returns {Promise}
 */

function cartRetrieve(userId) {
    validate.string(userId, 'User Id')

    // const { id, token } = this.__credentials__

    return (async () => {
        // validate.string(id, 'id')
        const response = await fetch(`${REACT_APP_API_URL}/user/cart/list`, {
            method: 'GET',
            headers: {'authorization': `bearer ${this.__token__}` },
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { cart } = await response.json()
        
        return cart   
        
    })()
}
export default cartRetrieve