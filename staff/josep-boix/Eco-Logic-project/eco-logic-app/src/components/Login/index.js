import React from 'react'

export default function({ onBack, onLogin }) {

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
                    <label className="loginPanel__lbl">e-mail<input className="loginPanel__input" type="email" name="email" placeholder="Your email"/></label>
                    <label className="loginPanel__lbl">password<input className="loginPanel__input" type="password" name="password" /></label>

                    <button className="btn loginPanel__btn">Accedeix</button>
                </form>

                <a className="ancor" href="/" onClick={event => {
                    event.preventDefault()
                    
                    onBack()
                }}>Go back</a>
            </div>
        </main>
    </>
}