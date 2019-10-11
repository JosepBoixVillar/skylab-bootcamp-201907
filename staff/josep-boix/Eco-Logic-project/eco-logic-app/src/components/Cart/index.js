import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
// import './index.sass'

import logic from '../../logic'
import UserCart from '../Usercart'

function Cart({ history }) {
    const [,setView] = useState()
    const [user, setUser] = useState()
    const [error, setError] = useState()

    const handleGoBack = () => {
        setView('home')
        history.push('/home')
    }

  
    useEffect(() => {
        if (logic.isUserLoggedIn())
            (async () => {
                try {
                    const user = await logic.retrieveUser()
                    setUser(user)

                } catch (error) {
                    setError(error.message)
            }
            })()
    }, [history.location])

    return <>
        {!logic.isUserLoggedIn() ?
        <section className="cartPanel">
            <div className="cartPanel__user">            
                <h2 className="cartPanel">You need to be registered in order to adquire our products, please 
                    <a href="/#/login" className="cartPanel__ancor ancor"> log in </a> or 
                    <a href="/#/register" className="cartPanel__ancor ancor"> sign up </a> if you are not still a member of our comunity.
                </h2>
                <a href='/#/home' className="ancor" onClick={handleGoBack} >Go back</a>
            </div>
        </section>
        :  
        <UserCart/>
        }

        {error && <Feedback message={error} /> }
    
    </>
}
export default withRouter(Cart)