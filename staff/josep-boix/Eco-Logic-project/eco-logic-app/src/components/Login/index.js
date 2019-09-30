import React from 'react'
import {Link} from 'react-router-dom'

export default function({ onLogin }) {

    return <>
        <main className="loginPanel">  
            <h2 className="loginPanel__title">LOG IN</h2>
            <div>
                <form className="loginPanel__form" onSubmit={event => {
                    event.preventDefault()
                    
                    const { target: { email: { value: email },
                    password: { value: password } } } = event
                    onLogin(email, password) 
                }}>
                    <label className="loginPanel__form--lbl">e-mail</label>
                    <input className="loginPanel__form--input" type="email" name="email" placeholder="Your email"/>
                    <label className="loginPanel__form--lbl">password</label>
                    <input className="loginPanel__form--input" type="password" name="password" />

                    <button className="btn loginPanel__btn">Accedeix</button>
                </form>

                <Link className="ancor" to='/'>Go Back</Link>

                {/* <a className="ancor" href="/" onClick={event => {
                    event.preventDefault()
                    
                    onBack()
                }}>Go back</a> */}
            </div>
        </main>
    </>
}