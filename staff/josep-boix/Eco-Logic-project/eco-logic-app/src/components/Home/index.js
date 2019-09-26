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

    return <div>
        <main className="home">
            Welcome, {user && user.name}!
            <button onClick={onLogout}>See you!</button> 
        </main>
    </div>
})
export default home