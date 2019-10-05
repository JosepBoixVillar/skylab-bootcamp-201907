import React, { useState } from 'react'

function CartSuccess({ history }) {
    const [view, setView] = useState()

    const handleGoToHome = () => {
        setView('home')
        history.push('/#/home')
    }

    const handleGoToCart = () => {
        setView('cart')
        history.push('/cart')
    }

    return <div className="successPanel">
        <h2 className="successPanel__title">Your product has been added to the cart!</h2>
        <p className="successPanel__text">
            What do you need now? 
            <a className="successPanel__a ancorTo" href="/#/home" onClick={handleGoToHome}>
                Buy sth. more</a>
            <a className="successPanel__a ancorTo" href="/#/cart" onClick={handleGoToCart}>
                See my Cart</a>
        </p>        
    </div>
}
export default CartSuccess