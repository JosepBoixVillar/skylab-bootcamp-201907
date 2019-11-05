import validate from 'utils/validate'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * delete Products from the user.cart
 * 
 * @param {*} productId 
 * 
 * @returns {Promise}
 */

export default function (userId, productId) {
    validate.string(userId, 'user id')
    validate.string(productId, 'product id')
    
    // const { id, token } = this.__credentials__

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/cart/delete`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${this.__token__}` },
            body: JSON.stringify({userId, productId})
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