import validate from 'utils/validate'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Add productId & quantity to an userId
 * 
 * @param {*} userId 
 * @param {*} quantity 
 * @param {*} productId 
 * 
 * @returns {Promise}
 */

export default function(quantity, productId) {
    validate.number(quantity, 'quantity')
    validate.string(productId, 'productId')

    // const { id, token } = this.__credentials__

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/cart`, {
            method: 'POST',
            headers: { 'content-type': 'application/json','authorization': `bearer ${this.__token__}` },
            body: JSON.stringify({ quantity, productId })
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}