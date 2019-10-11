import validate from "utils/validate"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(productId) {
    validate.string(productId, 'Product ID')

    return(async () => {
        const response = await fetch(`${REACT_APP_API_URL}/detail/${productId}`, {
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