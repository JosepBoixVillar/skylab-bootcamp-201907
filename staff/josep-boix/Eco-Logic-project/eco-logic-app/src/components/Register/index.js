import React from 'react'
import {Link} from 'react-router-dom'

export default function({ onRegister }) {

    return <>
        <main className="registerPanel">
            <h2 className="registerPanel__title">REGISTER</h2>
            <div >
                <form className="registerPanel__form" onSubmit={event => {
                    event.preventDefault()

                    const { target: { name: { value: name }, email: { value: email }, password: { value: password}}} = event

                    onRegister(name, email, password)
                }}>
                    <label className="registerPanel__form--lbl">Name</label>
                    <input className="registerPanel__form--input" type="text" name="name" placeholder="Your name"/>
                    <label className="registerPanel__form--lbl">e-mail</label>
                    <input className="registerPanel__form--input" type="email" name="email" placeholder="Your email"/>
                    <label className="registerPanel__form--lbl">password</label>
                    <input className="registerPanel__form--input" type="password" name="password" />

                    <button className="btn registerPanel__btn">Sign up</button>
                </form>

                <Link className="ancor" to='/'>Go back</Link>

                {/* <a className="ancor"href="/" onClick={event => {
                    event.preventDefault()
                    onBack()
                }}>Tornar</a> */}
            </div>
        </main>
    </>
}