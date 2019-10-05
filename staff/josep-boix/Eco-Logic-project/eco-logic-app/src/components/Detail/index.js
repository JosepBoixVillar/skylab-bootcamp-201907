import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'
import logic from '../../logic'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

export default withRouter(function ({ history }) {
    const [error, setError] = useState()    
    const [, setView] = useState()
    const [product, setProduct] = useState()
    const [, setSuccess] = useState(false)

    const handleGoBack = () => {
        setView('home')
        history.push('/#/home')
    }

    const handleAddToCart = async (quantity) => {
        debugger
        const pid = product._id
        
        try{
            await logic.addToCart(pid, quantity)
            setSuccess(true)
            history.push('/cart-success')
            setView('cart-success')
        }catch({ message }){
            setError(message)
            // console.log(error.message)
        }
    }

    useEffect(() => {
        (async () => {
            const pid = history.location.pathname.split('/').slice(-1)
            const product = await logic.retrieveProduct(pid)
            setProduct(product)
        })()
    }, [])
  
    return <>
        {product && <main className="detailProduct">
            <figure className="detailProduct__figure">
                <img className="detailProduct__figure--image" src={`${REACT_APP_API_PUBLIC}${product.image}`} />
            </figure>
            <section className="detailProduct__text">
                <p className="detailProduct__text--name">{product.name}</p>
                <p className="detailProduct__text--price">Just: {product.price} €</p>
                <p className="detailProduct__text--description">{product.description}</p>
            </section>
            <form className="detailProduct__form" onSubmit= {event => {
                event.preventDefault()
                const { target: { quantity: { value: quantity } } } = event
                handleAddToCart(quantity)
            }}>
                <input className="detailProduct__form--input" type="number" pattern="[0-9]*" name="quantity" defaultValue={1} ></input>
                <button className="detailProduct__form--btn" >Add to cart</button>

            </form>

            {error && <Feedback message={error} />}
            
            <a href='/#/home' className="ancor" onClick={handleGoBack} >Go back</a>
        </main>
        }
    </>
})