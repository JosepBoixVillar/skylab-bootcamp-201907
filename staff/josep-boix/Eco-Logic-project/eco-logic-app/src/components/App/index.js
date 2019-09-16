import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
// import './index.sass'

import Header from '../Header'
import Register from '../Register'
import Login from '../Login'
import Home from '../Home'

import logic from '../../logic'

export default withRouter(function ({ history }) {
  const [setView] = useState(logic.isUserLogIn() ? 'home' : undefined )

  const handleBack = () => {
    setView(undefined)
    history.push('/')
  }
  const handleGoToRegister = () => {
    setView('register')
    history.push('/register')
  }

  const handleRegister = async (name, email, password) => {
    try {
      await logic.registerUser(name, email, password)
      console.log("register success")
      history.push('/login')
    } catch({ message }) {
      console.log("error", message)
    }
  }

  const handleGoToLogin = () => {
    setView('login')
    history.push('/login')
  }

  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)
      console.log("authenticate success")
      history.push('/home')
    } catch({ message }) {
      console.log("error", message)
    }
  }

  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  },[history.location])

  const handleLogout = () => {
    logic.logUserOut()
    setView(undefined)
    history.push('/')
  }

  return <div className="App">
    <Route path='/' render={() => <Header onRegister={handleGoToRegister} onLogin={handleGoToLogin}/> } />

    <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} /> } />
    <Route path="/login" render={() => <Login onBack={handleBack} onLogin={handleLogin}/>} />
    {logic.isUserLogIn() && <Route path="/home" render={() => <Home onLogout={handleLogout}/>} />}

  </div>
})
