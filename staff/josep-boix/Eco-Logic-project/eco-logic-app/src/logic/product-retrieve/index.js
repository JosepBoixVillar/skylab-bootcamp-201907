import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieve product by id
 * 
 * @param {string} productId
 * 
 * @returns {Promise}
 */

export default function(productId) {
    validate.string (productId, 'productId')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/detail/${productId}`, {
            method: 'GET',
            headers: {'content-type': 'application/json' }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        const { product } = await response.json()

        return product
    })()
}