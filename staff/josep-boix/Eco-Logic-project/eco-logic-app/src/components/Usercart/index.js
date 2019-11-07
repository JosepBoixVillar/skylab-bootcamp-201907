import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import './index.sass'

import logic from '../../logic'
import Feedback from '../Feedback'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

function UserCart({ history }) {
  const [cart, setCart] = useState()
  const [error, setError] = useState()
  
  let total = 0

  useEffect(() => {
    (async () => {
      try {
        const cart = await logic.retrieveCart()
        setCart(cart)
        
      } catch (error) {
        setError(error.message)
      }
    })()
  }, [cart])

  async function handleUpdateCart(productId) {
    try {
      await logic.removeCart(productId)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleEndFlow = () => {
    history.push('/thanks')
  }

  return <>
    {cart && cart.length === 0 &&
    <div className="productList__empty">
        <p className="productList__message">Cart is empty</p>
        <a className="ancor" href="/#/home">Go home</a>
    </div>
    }
    {cart && cart.length > 0 &&
    <div >
      <ul className="productList">
        {cart.map(item => {
          return <>
            <ul>
              <li className="productList__product--title"> {item.product.title}
              <li className="productList__product--delete" onClick={event => {
                event.preventDefault()
                
                let productId = item.product._id
                handleUpdateCart(productId)
              }}><a href="/">Delete</a></li>
              </li>
              <li className="productList__product--img"><img src={ `${REACT_APP_API_PUBLIC}${item.product.image}`} alt="product_image" width="300"/></li>
              <li className="productList__product--title"> { 'Price: ' + item.product.price + " €" } </li>
              <li className="productList__product--title"> { 'Quantity: ' + item.quantity + " unit/s" } </li>
              <li className="productList__product--total"> { 'Product Total: '+ (item.product.price * item.quantity.toString()).toFixed(2)+ " €" } </li>         
              <li className="productList__product--hidden"> { 'Total: '+ (total += (item.product.price * item.quantity.toString()))+ " €" } </li>         
            </ul>
          </>
        })}
      </ul>
      <div className="productList">
        <a className="ancor" href="/#/home">Go home</a>
      </div>
      {cart !== "" && cart !== undefined && 
      <div className="userCart-total">
        <h3 className = "userCart-total__total">Total: {total.toFixed(2) + " €"} </h3> 
        <button className="registerPanel__btn" onClick={handleEndFlow}>Do you BUY IT??</button>  
      </div>
      }
      
      {error && <Feedback message={error} /> }
      
      {/* {cart != "" && cart != undefined && <button className = "formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>} */}
      {/* <p><a href="/#/home">X</a></p> */}

    </div>
    }

  </>
}

export default withRouter(UserCart)


  // function handleCheckout(event) {
  //   event.preventDefault()
  //   handlePlaceOrder()
  // }
  // async function handlePlaceOrder() {

  //   try {
  //     await logic.placeOrder()
  //     setView("success")
  //     setFromCart(true)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
