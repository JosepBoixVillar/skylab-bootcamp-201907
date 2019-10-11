import React, { useState, useEffect } from 'react'
// import './index.sass'

import logic from '../../logic'
import Feedback from '../Feedback'

const REACT_APP_API_PUBLIC = process.env.REACT_APP_API_PUBLIC 

function UserCart() {
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
      await logic.updateCart(productId)
    } catch (error) {
      setError(error.message)
    }
  }

  return <>
    {cart && cart.length == 0 &&
    <div>
        <p className="formPanel">Cart is empty</p>
    </div>
    }
    {cart && cart.length > 0 &&
    <div className="productList">
      <ul>
        {cart.map(item => {
          return <>
            <ul className='userCart'>
              <li className="productList__product" onClick={event => {
                event.preventDefault()
                
                let productId = item.product._id
                handleUpdateCart(productId)
              }}><a href="" className="ancor" >wtf</a></li>
              <li className="productList__product--title">{item.product.name}</li>
              <li ><img className="productList__product--img" src={`${REACT_APP_API_PUBLIC}${item.product.image}`}/></li>
              <li className="productList__product--title">{'Price:' + item.product.price + " €"}</li>
              <li className="productList__product--title">{'Quantity: ' + item.quantity}</li>
              <li className="productList__product--total">{'Total: '+(total += (item.product.price * item.quantity))+ " €"}</li>         
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
    <a className="ancor" href="/#/home">Go home</a>

  </>
}

export default UserCart


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
