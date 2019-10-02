import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import queryString from 'query-string'
import logic from '../../logic'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

export default withRouter(function ({query}) {
    const [products, setProduct] = useState(undefined)
    useEffect(() => {
        async function busqueda () {
            const { product } = await logic.searchProducts(query)
                setProduct(product)
        }

        busqueda()
    }, [])

    return <>
        <main>
            <ul className="productList" >
                { products ? products.map(item => <li className="productList__product" key={item._id}>
                    <a className="productList__product--a" href={`/#/detail/${item._id}`}>
                        <img className="productList__product--img" src={`${REACT_APP_API_PUBLIC}${item.image}`}></img>
                        <div >
                            <p className="productList__product--title">Name: {item.name}</p> 
                            <p className="productList__product--title">Categorie: {item.categoria}</p> 
                        </div>
                    </a>
                </li>)
                :
                <p className="ad__none">No hay resultados</p>}
            </ul>
        </main>
    </>
})
