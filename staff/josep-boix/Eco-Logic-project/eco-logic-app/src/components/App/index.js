import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import './index.sass'

import Landing from '../Landing'
import Register from '../Register'
import RegisterSuccess from '../Register-success'
import Login from '../Login'
import Results from '../Results'
import Home from '../Home'
import Cart from '../Cart'

import logic from '../../logic'

export default withRouter(function ({ history }) {
  const [view, setView] = useState()
  const [query, setQuery] = useState()

  const handleRegister = async (name, email, password) => {
    try {
        await logic.registerUser(name, email, password)
        console.log("register success")
        history.push('/register_success')
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
      debugger
        await logic.authenticateUser(email, password)
        history.push('/home')
    } catch({ message }) {
        console.log("error", message)
    }
}
  // function handleSearch(query) {
  //   setQuery(query)
  //   history.push(`/search?query=${query}`)
  // }

  useEffect(() => {
    const { q: query } = queryString.parse(history.location.search)

    setQuery(query)
  }, [])


  return <>
    <Route exact path='/' render={ () => <Landing /> } />
    <Route path="/register" render={ () => <Register onRegister={handleRegister}/> } />
    <Route path="/register_success" render={ () => <RegisterSuccess onLogin={handleGoToLogin}/> } />
    <Route path="/login" render={ () => <Login onLogin={handleLogin}/> } />
    <Route path="/search/:query" render={ props => <Results queryId={props.match.params.query}  />} />
    <Route path="/cart" render={ () => <Cart /> } />
    <Route path="/home" render={ () => logic.isUserLogIn() ? <Home /> : history.push('/login')} /> 
  </>
})  