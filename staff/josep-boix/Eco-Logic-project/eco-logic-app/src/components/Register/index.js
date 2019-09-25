import React from 'react'

export default function ({ onBack, onRegister }) {
    return <>
        <h2>REGISTRE</h2>
        
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, 
                email: { value: email }, 
                password: { value: password } } } = event
            onRegister(name, email, password)
        }}>
            <label>Nom<input type="text" name="name" placeholder="Your name"/></label>
            <label>Correu<input type="email" name="email" placeholder="Your email"/></label>
            <label>Contrasenya<input type="password" name="password" /></label>

            <button>Registra't</button>
        </form>

        <a href="/" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Tornar</a>
    </>
}