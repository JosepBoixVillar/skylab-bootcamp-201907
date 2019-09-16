import React from 'react'

export default function({ onBack, onLogin }) {

    return <> 
        <h2>ACCÈS</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email },
                password: { value: password } } } = event
            onLogin(email, password) 
        }}>
            <label>Correu<input type="email" name="email" placeholder="Your email"/></label>
            <label>Contrasenya<input type="password" name="password" /></label>

            <button>Accedeix</button>
        </form>

        <a href="/" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Tornar</a>
    </>
}