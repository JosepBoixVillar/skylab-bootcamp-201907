import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import {Link} from 'react-router-dom'

import logic from '../../logic'

export default withRouter(function({ history }) {
    const [error, setError] = useState()

    // const handleBack = () => {
    //     setView(undefined)
    //     history.push('/')
    // }
    
    const handleRegister = async (name, email, password) => {
        try {
            await logic.registerUser(name, email, password)
            // console.log("register success")
            history.push('/register_success')
        } catch({ message }) {
            // console.log("error", message)
            setError(message)
        }
    }

    return <>
        <main className="registerPanel">
            <h2 className="registerPanel__title">REGISTER</h2>
            <div >
                <form className="registerPanel__form" onSubmit={event => {
                    event.preventDefault()

                    const { target: { name: {value: name}, email: {value: email}, password: {value: password} } } = event
                    handleRegister(name, email, password)
                } }>
                    <label className="registerPanel__form--lbl">Name</label>
                    <input className="registerPanel__form--input" type="text" name="name" placeholder="Your name"/>
                    <label className="registerPanel__form--lbl">e-mail</label>
                    <input className="registerPanel__form--input" type="email" name="email" placeholder="Your email"/>
                    <label className="registerPanel__form--lbl">password</label>
                    <input className="registerPanel__form--input" type="password" name="password" />

                    {error && <Feedback message={error} /> }

                    <button className="btn registerPanel__btn">Sign up</button>
                </form>

                <Link to='/' className="ancor">Go back</Link>

                {/* <a className="ancor"href="/" onClick={handleBack}>Tornar</a> */}
            </div>
        </main>
    </>
})