import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves product detail by product Id
 * 
 * @param {String} productId 
 * 
 * @throws {Error} if any doesn't go right
 * 
 * @returns {Promise}
 */

function productDetail(productId) {

    validate.string(productId, 'product Id')

    return(async () => {
        const response = await fetch(`${REACT_APP_API_URL}user/detail/${productId}`, {
            method: 'GET',
            headers: { 'content-type':'application/json' }
        })
        if(response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { product } = await response.json
        return product
    })()

}

export default productDetail