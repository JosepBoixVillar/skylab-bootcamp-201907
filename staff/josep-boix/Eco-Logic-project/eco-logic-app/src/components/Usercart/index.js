import React, { useState, useEffect } from 'react'
import logic from '../../logic'
// import './index.sass'

import Feedback from '../Feedback'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

function UserCart() {
  const [cart, setCart] = useState()
  const [error, setError] = useState()
  
  let total = 0
  let lengthCart

  useEffect(() => {
    (async () => {
      try {
        const cart = await logic.retrieveCart()
        setCart(cart)
        lengthCart = cart.length
        
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


  return <>
    {cart && cart.length == 0 &&
    <div>
        <p className="formPanel">Cart is empty</p>
    </div>
    }
    {cart && cart.length > 0 &&
    <div>
      <ul>
        {cart.map(item => {
          return <>
            <ul className='userCart'>
              <li onClick={event => {
                event.preventDefault()
                
                let productId = item.product._id
                handleUpdateCart(productId)
              }}><a>Delete</a></li>
              <li className="userCart-title">{item.product.name}</li>
              <li className="userCart-description"><img src={`${REACT_APP_API_PUBLIC}${item.product.image}`}/></li>
              <li className="userCart-description">{'Price:' + item.product.price + " €"}</li>
              <li className="userCart-description">{'Quantity: ' + item.quantity}</li>
              <li className="userCart-hidden">{'Total: '+(total += (item.product.price * item.quantity))+ " €"}</li>         
            </ul>
          </>
        })}
      </ul>
      {cart != "" && cart != undefined && <h3 className = "userCart-total">Total: {total + " €"} </h3> }
      
      {error && <Feedback message={error} /> }
      
      {/* {cart != "" && cart != undefined && <button className = "formPanel-submit-buy" onClick={handleCheckout} >Checkout</button>} */}
      {/* <p><a href="/#/home">X</a></p> */}

    </div>
    }
  </>
}

export default UserCart