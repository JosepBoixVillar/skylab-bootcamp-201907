import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

function EndFlow({ history }) {
    const [, setView] = useState()

    const handleGoToHome = () => {
        setView('home')
        history.push('/#/home')
    }

    const handleGoToCart = () => {
        setView('cart')
        history.push('/cart')
    }

    return <div className="successPanel">
        <h2 className="successPanel__title">You buy! Thanks a lot!</h2>
        <p className="successPanel__text">
            How can we help you now? <a className="successPanel__a ancorTo" href="/#/home" onClick={handleGoToHome}> Buy sth. more</a> or <a className="successPanel__a ancorTo" href="/#/" onClick={handleGoToCart}> go Home.</a>
        </p>        
    </div>
}
export default withRouter(EndFlow)