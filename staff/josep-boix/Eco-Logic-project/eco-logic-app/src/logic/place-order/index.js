import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Add an order to an user id
 * 
 * @param {*} userId 
 * @param {*} productId 
 * @param {*} quantity 
 * 
 * @returns {Promise}
 */

function placeOrder (userId, productId, _quantity) {
    validate.string(userId, 'user Id')
    validate.string(productId, 'product Id')
    validate.number(_quantity, 'quantity')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/orders`, { 
                method: 'POST', 
                headers: { 'content-type': 'application/json', 'authorization': `bearer ${this.__token__}` },
                body: JSON.stringify({ userId, productId, _quantity })
            })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return response.json()
        }
    })()
}
export default placeOrder