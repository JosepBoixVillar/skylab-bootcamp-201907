import React from 'react'

export default function({ onBack, onRegister }) {
    
    return <>
        <main className="registerPanel">
            <h2 className="registerPanel__title">REGISTER</h2>
            <div >
                <form className="registerPanel__form" onSubmit={event => {
                    event.preventDefault()
                    const { target: {name: { value: name },
                    email: {value: email },
                    password: { value: password } } } = event
                    onRegister(name, email, password)
                }}>
                    <label className="registerPanel__lbl">Name<input className="registerPanel__input" type="text" name="name" placeholder="Your name"/></label>
                    <label className="registerPanel__lbl">e-mail<input className="registerPanel__input" type="email" name="email" placeholder="Your email"/></label>
                    <label className="registerPanel__lbl">password<input className="registerPanel__input" type="password" name="password" /></label>

                    <button className="btn registerPanel__btn">Sign in</button>
                </form>

                <a className="ancor"href="/" onClick={event => {
                    event.preventDefault()
                    onBack()
                }}>Tornar</a>
            </div>
        </main>
    </>
}