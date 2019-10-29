import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import './index.sass'

import logic from '../../logic'
import Feedback from '../Feedback'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

function UserCart({ history }) {
  // debugger
  const [cart, setCart] = useState()
  const [error, setError] = useState()
  const [setView] = useState()
  
  let total = 0
  // let itemTotal = 0

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
      await logic.updateCart(productId)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleEndFlow = () => {
    // setView('endFlow')
    history.push('/thanks')
  }

  return <>
    {cart && cart.length === 0 &&
    <div className="productList__empty">
        <p className="productList__message">Cart is empty</p>
    </div>
    }
    {cart && cart.length > 0 &&
    <div className="productList">
      <ul>
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
              <li className="productList__product--total"> { 'Total: '+ (item.product.price * item.quantity.toString()).toFixed(2)+ " €" } </li>         
              <li className="productList__product--hidden"> { 'Total: '+ (total += (item.product.price * item.quantity.toString()))+ " €" } </li>         
            </ul>
          </>
        })}
      </ul>
      {cart !== "" && cart !== undefined && 
      <>
        <h3 className = "userCart-total">Total: {total.toFixed(2) + " €"} </h3> 
        <button className="buyBtn" onClick={handleEndFlow}>Do you BUY IT??</button>  
      </>
      }
      
      {error && <Feedback message={error} /> }
      
      {/* {cart != "" && cart != undefined && <button className = "formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>} */}
      {/* <p><a href="/#/home">X</a></p> */}

    </div>
    }
    <a className="ancor" href="/#/home">Go home</a>

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
