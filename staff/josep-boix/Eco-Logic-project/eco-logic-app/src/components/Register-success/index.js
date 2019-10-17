import React, { useState } from 'react'

function RegisterSuccess({ history }) {
    const [, setView] = useState()

    const handleGoToLogin = () => {
        setView('login')
        history.push('/login')
    }

    return <div className="successPanel">
        <h2 className="successPanel__title">Congratulations!</h2>
        <p className="successPanel__text">
            Now you are ready in. Please 
            <a className="successPanel__ancorToLogin" href="/login" onClick={handleGoToLogin}>
                 log in </a>to your private area.
        </p>        
    </div>
}
export default RegisterSuccess