import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../../logic'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

export default withRouter(function ({ history }) {
    const [, setView] = useState()
    const [product, setProduct] = useState()
    const [success, setSuccess] = useState(false)

    const handleGoBack = () => {
        setView('home')
        history.push('/home')
    }

    const handleGoToCart = () => {
        setView('cart')
        history.push('/cart')
    }

    function handleAddToCart(event){
        event.preventDefault()
        const pid = product.id
        handleAddCart(pid)
    }
    
    async function handleAddCart(pid){
        try{
          await logic.addToCart(pid)
          setSuccess(true)
        }catch(error){
          console.log(error.message)
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
        {product &&
        <> 
        <figure className="detailProduct">
            <img className="detailProduct__image" src={`${REACT_APP_API_PUBLIC}${product.image}`} />
        </figure>
        <section className="detailProduct__text">
            <p className="detailProduct__text--name">{product.name}</p>
            <p className="detailProduct__text--price">{product.price}</p>
            <p className="detailProduct__text--description">{product.description}</p>
        </section>
        <form className="detailProduct__btn" onSubmit={handleAddToCart}>
            <input className="detailProduct__input--addToCart" name="inputquantity" placeholder= "how many?" ></input>
            <button className="detailProduct__btn--addToCart" >Add to cart</button>
        </form>
        <a href='/home' onClick={handleGoBack} >Go back</a>
        </>
        }
    </>
})