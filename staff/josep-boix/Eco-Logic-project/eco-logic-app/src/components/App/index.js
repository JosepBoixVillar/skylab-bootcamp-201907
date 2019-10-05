import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
// import queryString from 'query-string'
import './index.sass'

import Header from '../Header'
import Landing from '../Landing'
import Register from '../Register'
import RegisterSuccess from '../Register-success'
import Login from '../Login'
import Results from '../Results'
import Home from '../Home'
import Detail from '../Detail'
import Cart from '../Cart'
import CartSuccess from '../CartSuccess'
import Footer from '../Footer'

import logic from '../../logic'

export default withRouter(function ({ history }) {
  const [user, setUser] = useState()
  const [view, setView] = useState()
  const [query, setQuery] = useState('')

  // function handleSearch(query) {
  //   setQuery(query)
  //   history.push(`/search?query=${query}`)
  // }

  return <>
    <Header view={view} setView={setView} user={user} setUser={setUser} />

    <Route exact path='/' render={ () => <Landing /> } />
    <Route path="/register" render={ () => <Register /> } />
    <Route path="/register_success" render={ () => <RegisterSuccess /> } />
    <Route path="/login" render={ () => <Login /> } />
    <Route path="/search/:query" render={ props => <Results query={props.match.params.query}  />} />
    <Route path="/home" render={ () => logic.isUserLoggedIn() ? <Home setView={setView} user={user} setUser={setUser} /> : <Landing/>} /> 
    <Route path="/cart" render={ () => <Cart /> } />
    <Route path="/detail/:productId" render={ () => <Detail /> } /> 
    <Route path="/cart-success" render={ () => <CartSuccess /> } /> 

    <Route path="/order" render={ () => <Cart /> } /> 

    <Footer/>
  </>
})  