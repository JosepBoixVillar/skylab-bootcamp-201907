import React, { useContext } from 'react'
import Context from '../Context'
// import './index.sass'

function Cart() {
    const { setView, credentials, user } = useContext(Context)
   
    return <>
        <section>
            {user &&
                <div className="cartPanel">
                    <h2 className="cartPanel__title">Cart</h2> 
                    <div className="cartPanel__form">
                        <p>Your shopping cart is empty</p>
                        <a href="#" onClick={event => {
                        event.preventDefault()
                        setView(undefined)
                        }}><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>
                    </div>
                </div>     
            }
            {!user &&
                <h2 className="cartPanel">In order to shop please <a href="/#/login" className="cartPanel-submit">
                    log in</a> or <a href="/#/register" className="cartPanel-submit">register</a></h2>
            }
        </section>     
    </>
}

export default Cart