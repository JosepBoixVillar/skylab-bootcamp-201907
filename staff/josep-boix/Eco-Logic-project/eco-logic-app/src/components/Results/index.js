import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
// import queryString from 'query-string'
import logic from '../../logic'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

export default withRouter(function ({ history, query }) {
    const [error] = useState()
    const [, setView] = useState()
    const [products, setProduct] = useState(undefined)
    
    const handleGoBack = () => {
        setView('home')
        history.push('/#/home')
    }

    useEffect(() => {
        async function busqueda () {
            const { product } = await logic.searchProducts(query)
            setProduct(product)
        }
        busqueda()
    }, [history.location])

    return <>
        <main className="productList">
            <ul>
                {products && products.length > 0 ? products.map(item => <li className="productList__product" key={item._id}>
                    <div>
                        <a className="productList__product--a" href={`/#/detail/${item._id}`}>
                            <img className="productList__product--img" src={`${REACT_APP_API_PUBLIC}${item.image}`} alt="product_image"></img>
                        </a>
                        <div >
                            <p className="productList__product--title">Name: {item.title}</p> 
                            <p className="productList__product--title">Categorie: {item.categoria}</p> 
                        </div>
                    </div>
                </li>)
                :
                <div className="ordersPanel">
                    <p className="ordersPanel__emptyCart">There's no results for your search, try again</p>
                </div>}

                {error && <Feedback message={error}/>}
                {/* products && <p className="productList__product--none">No hay resultados</p>} */}
            
            </ul>

            <a href='/#/home' className="ancor" onClick={handleGoBack} >Go back</a>

        </main>
    </>
})
