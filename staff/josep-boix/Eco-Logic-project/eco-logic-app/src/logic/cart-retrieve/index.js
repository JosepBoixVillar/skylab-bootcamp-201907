const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {

    // const { id, token } = this.__credentials__

    return (async () => {
        
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