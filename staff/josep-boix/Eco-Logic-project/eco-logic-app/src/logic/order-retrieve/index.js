const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Show all the orders from an user
 * 
 * @throws {Error} if any doesn't go right
 * 
 * @returns {Promise}
 */

export default function () {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/orders/list`, {
            method: 'GET',
            headers: {'authorization' : `bearer ${this.__token__}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { orderId } = await response.json()
        
        return orderId
        
    })()

}