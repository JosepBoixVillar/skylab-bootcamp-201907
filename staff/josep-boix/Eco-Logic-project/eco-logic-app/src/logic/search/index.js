const validate = require('utils/validate')

/**
 * Search according to a query
 * 
 * @param{String} query
 * 
 * @returns{Promise}
 */

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

function searchProducts(query)  { 

    validate.string(query, 'query')

    return(async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/search/${query}`, {
            method: 'GET', 
            headers: { 'content-type': 'application/json' }
        })
    
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error.message)
        }

        const products = await response.json()
    
        return products
    })()

}

export default searchProducts