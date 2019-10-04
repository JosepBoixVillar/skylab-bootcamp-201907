import React, { useState } from 'react'
import Register from '../Register'
// // import './index.sass'

function Cart() {
    const { setView, user, product } = useState()

    return <>
        <section className="cartPanel">
            {user && <div className="cartPanel__user">
                <h2 className="cartPanel__user--title">Cart</h2> 
                <div className="cartPanel__user--form">
                    {!product ? 
                    <p>Your shopping cart is empty</p>
                    :
                    <Register />}
                    <a href="/#/" onClick={event => {
                    event.preventDefault()
                    setView(undefined)
                    }}>Go back</a>
                </div>
            </div>     
            }
            {!user && <div className="cartPanel__user">            
                <h2 className="cartPanel">You need to be registered in order to adquire our products, please 
                    <a href="/#/login" className="cartPanel-submit"> log in </a> or 
                    <a href="/#/register" className="cartPanel-submit"> register </a> if you are not still a member of our comunity.
                </h2>
                <a href="/#/" onClick={event => {
                    event.preventDefault()
                    setView(undefined)
                }}>Go back</a>
            </div>
            }
        </section>     
    </>
}

export default Cart