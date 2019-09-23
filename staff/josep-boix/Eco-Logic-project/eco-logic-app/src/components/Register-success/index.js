import React from 'react'

function RegisterSuccess({ onLogin }) {

    return <div className="panel-success">
        <p>
            Enhorabona! Estàs registrat, ja pots accedir a la teva <a className="ancor" href="" onClick={event => {
                event.preventDefault()

                onLogin()
            }}>àrea privada</a>.
        </p>
    </div>
}
export default RegisterSuccess