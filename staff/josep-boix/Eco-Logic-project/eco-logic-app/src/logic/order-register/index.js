// import validate from "utils/validate"

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

export default function () {
    // validate.string(productId, 'product Id')
    // validate.number(quantity, 'quantity')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/orders`, { 
                method: 'POST', 
                headers: { 'content-type': 'application/json', 'authorization':`${this.__token__}` },
                // body: JSON.stringify({ productId, quantity })
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