import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../../logic'

const home = withRouter(function({ history, onLogout }) {
    const [user, setUser] = useState()
    
    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()
            setUser(user)
        })()
    }, [history.location]) 

    return <main className="home">
        Benvingut, {user && user.name}!
        <button onClick={onLogout}>Surt</button> 
    </main>
})
export default home