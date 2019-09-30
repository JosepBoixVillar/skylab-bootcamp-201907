import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import queryString from 'query-string'
import logic from '../../logic'

export default withRouter(function ({ history, queryId }) {

    const [products, setProduct] = useState(undefined)

    useEffect(() => {
        async function busqueda () {
            const { product } = await logic.searchProducts(queryId)
                setProduct(product)
        }
        
        busqueda()

    }, [history.location])

    return<section className="result-products">
            { products && <> <h1>Hola, hay productos</h1> <ul> {products.map(product => <li>{product.name}</li>)}</ul> </>}
            { !products && <h1>No hay products</h1> }

</section>
})

// products.map(_product => <li  className ="productsResult__product" key={_product._id}>
//                     <a className="productsResult__a" href={`/#/product/${_product._id}`}>
//                         {/* <img class="productsResult__img" src={_product.image}></img> */}
//                         <div class="search__container">
//                             <p class="productsResult__title">{_product.title}</p> 
//                             <p class="productsResult__price">{_product.price}</p>
//                         </div>
//                     </a>
//                 </li>)