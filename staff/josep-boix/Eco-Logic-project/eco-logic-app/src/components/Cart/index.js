import React, { useState } from 'react'
import UserCart from '../Usercart'
// import './index.sass'

function Cart({ history}) {
    const { setView, user, product } = useState()

    const handleGoBack = () => {
        setView('home')
        history.push('/#/home')
    }

    return <>
        <section className="cartPanel">
            {user && <div className="cartPanel__user">
                <h2 className="cartPanel__user--title">Cart</h2> 
                <div className="cartPanel__user--form">
                    {!product ? 
                    <p>Your shopping cart is empty</p>
                    :
                    <UserCart />}
                    <a href='/#/home' className="ancor" onClick={handleGoBack} >Go back</a>
                </div>
            </div>     
            }
            {!user && <div className="cartPanel__user">            
                <h2 className="cartPanel">You need to be registered in order to adquire our products, please 
                    <a href="/#/login" className="cartPanel-submit"> log in </a> or 
                    <a href="/#/register" className="cartPanel-submit"> sign up </a> if you are not still a member of our comunity.
                </h2>
                <a href='/#/home' className="ancor" onClick={handleGoBack} >Go back</a>
            </div>
            }
        </section>     
    </>
}

export default Cart