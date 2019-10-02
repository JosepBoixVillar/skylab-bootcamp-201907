import validate from 'utils/validate'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(productId, quantity) {
    validate.string(productId, 'productId')
    validate.string(quantity, 'quantity')

    // const { id, token } = this.__credentials__

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/cart`, {
            method: 'POST',
            headers: { 'content-type': 'application/json','authorization': `bearer ${this.__token__}` },
            body: JSON.stringify({productId,quantity})
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