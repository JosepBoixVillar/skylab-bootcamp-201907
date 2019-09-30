import React from 'react'

function RegisterSuccess({ onLogin }) {

    return <div className="successPanel">
        <h2 className="successPanel__title">Congratulations!</h2>
        <p className="successPanel__text">
            Now you are ready in. Please <a className="successPanel__ancorToLogin" href="/login" onClick={event => {
                event.preventDefault()

                onLogin()
            }}>log in</a> to your private area.

        </p>        
    </div>
}
export default RegisterSuccess