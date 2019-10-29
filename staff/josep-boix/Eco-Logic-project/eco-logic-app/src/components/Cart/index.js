import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
// import './index.sass'

import logic from '../../logic'
import UserCart from '../Usercart'

function Cart({ history }) {
    const [,setView] = useState()
    const [,setUser] = useState()
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
        <div className="cartPanel">            
            <h2 className="cartPanel__title">You need to be registered in order to adquire our products...</h2>
            <div className="userPanel">
                <p className="userPanel__text">Please 
                    <a className="userPanel__ancorToLogin" href="/#/login"> log in </a>
                    or <a className="cartPanel__ancorToLogin" href="/#/register"> sign up </a>
                    if you are not still a member of our comunity.
                </p>
            </div>
            <a href='/#/home' className="ancor" onClick={handleGoBack} >Go back</a>
        </div>
        :  
        <UserCart/>
        }

        {error && <Feedback message={error} /> }
    
    </>
}
export default withRouter(Cart)