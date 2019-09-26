import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import logic from '../../logic'

function Results ({ history }) {
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function search() {
            try{
                const { query } = queryString.parse(history.location.search) 
                const products = await logic.search(query)  

                setProduct(products)
            } catch(error) {
                setProduct([])
            }
        }
        search()
    }, [history.location])

    return <>
        <main>
            <form onSubmit={event => {
                event.preventDefault()
                const { target: { query: { value: query }}} = event
                history.push(`/search?query=${query}`)
            }}>
                {/* <section class="search">
                    <div class="search__banner">
                        <input className ="search__input" type="search" name="query" placeholder="¿Qué necesitas?"/>
                        <button className ="search__button"><FontAwesomeIcon icon={faSearch} size="50px" color="gray"/></button>
                    </div>
                </section> */}
            </form>
            <ul className="ad__ul" >
                {product.length ? product.map(_product => <li  className ="ad" key={_product._id}>
                    <a className="ad__a" href={`/#/product/${_product._id}`}>
                        <img class="ad__img" src={_product.image}></img>
                        <div class="search__container">
                            <p class="ad__title">{_product.title}</p> 
                            <p class="ad__price">{_product.price}</p>
                        </div>
                    </a>
                </li>): <p className="ad__none">No hay resultados</p>}
            </ul>
        </main>
    </>
}

export default withRouter(Results)