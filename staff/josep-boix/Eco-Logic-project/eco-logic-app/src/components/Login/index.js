import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'

import Feedback from '../Feedback'
import logic from '../../logic'

export default withRouter(function({ history, setView }) {
    const [error, setError] = useState()

    const handleLogin = async (email, password) => {
        try {
            await logic.authenticateUser(email, password)
            history.push('/home')
            setView('home')
        } catch({ message }) {
            setError(message)
            // console.log("error", message)
        }
    }
    
    return <>
        <main className="loginPanel">  
            <h2 className="loginPanel__title">LOG IN</h2>
            <div>
                <form className="loginPanel__form" onSubmit={event => {
                    event.preventDefault()
                    
                    const { target: { email: { value: email },
                    password: { value: password } } } = event
                    handleLogin(email, password) 
                }}>
                    <label className="loginPanel__form--lbl">e-mail</label>
                    <input className="loginPanel__form--input" type="email" name="email" placeholder="Your email"/>
                    <label className="loginPanel__form--lbl">password</label>
                    <input className="loginPanel__form--input" type="password" name="password" />

                    {error && <Feedback message= {error} />}

                    <button className="btn loginPanel__btn">Log in</button>
                </form>

                <Link to='/' className="ancor">Go Back</Link>

                {/* <a className="ancor" href="/" onClick={event => {
                    event.preventDefault()
                    
                    onBack()
                }}>Go back</a> */}
            </div>
        </main>
    </>
})